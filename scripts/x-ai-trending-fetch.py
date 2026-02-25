#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
X(Twitter) AI热门推文抓取脚本 - Twitter API v2版本
抓取泛AI类热门推文，按点赞数排序

频率: 每天4次 (06:00, 12:00, 18:00, 00:00)
输出: data/x-ai-trending/x_trending_YYYYMMDD_HH.json

技术方案: Twitter API v2 (使用Bearer Token)
"""

import os
import sys
import json
import time
from datetime import datetime, timedelta
from urllib.parse import quote

# 尝试导入requests
try:
    import requests
    REQUESTS_AVAILABLE = True
except ImportError:
    print("[ERROR] requests 库未安装")
    print("[INFO] 安装: pip install requests")
    REQUESTS_AVAILABLE = False
    sys.exit(1)

# 数据目录
DATA_DIR = os.path.expanduser("~/.openclaw/workspace/data/x-ai-trending")

# 加载环境变量
def load_env():
    """从.env.twitter加载凭证"""
    env_path = os.path.expanduser("~/.openclaw/workspace/.env.twitter")
    if os.path.exists(env_path):
        with open(env_path, 'r') as f:
            for line in f:
                if '=' in line and not line.startswith('#'):
                    key, value = line.strip().split('=', 1)
                    os.environ[key] = value
        return True
    return False

# Twitter API配置
TWITTER_API_BASE = "https://api.twitter.com/2"

# 监控关键词 (英文为主)
AI_KEYWORDS = [
    "AI",
    "ArtificialIntelligence",
    "ChatGPT",
    "GPT4",
    "ClaudeAI",
    "Midjourney",
    "StableDiffusion",
    "ComfyUI",
    "Runway",
    "PikaLabs",
    "OpenAI",
    "Anthropic",
    "Llama",
    "AIModel",
    "AIVideo",
    "AITools"
]

def get_bearer_token():
    """获取Bearer Token"""
    token = os.environ.get("TWITTER_BEARER_TOKEN")
    if not token:
        print("[ERROR] TWITTER_BEARER_TOKEN not found")
        print("[INFO] 请检查 .env.twitter 文件")
        return None
    return token

def search_tweets(query, max_results=10):
    """
    搜索推文
    API文档: https://developer.twitter.com/en/docs/twitter-api/tweets/search/api-reference/get-tweets-search-recent
    """
    bearer_token = get_bearer_token()
    if not bearer_token:
        return None
    
    headers = {"Authorization": f"Bearer {bearer_token}"}
    
    # 构建查询 (排除转推，只取英文)
    search_query = f"{query} -is:retweet lang:en"
    
    # 计算24小时前的时间 (用于获取最新推文)
    # Twitter API的recent搜索返回过去7天的推文
    # 我们需要按时间过滤，这里获取当天的
    
    url = f"{TWITTER_API_BASE}/tweets/search/recent"
    params = {
        "query": search_query,
        "max_results": min(max_results, 100),  # API限制最大100
        "tweet.fields": "created_at,public_metrics,author_id,context_annotations",
        "expansions": "author_id",
        "user.fields": "username,public_metrics"
    }
    
    try:
        response = requests.get(url, headers=headers, params=params, timeout=30)
        
        if response.status_code == 200:
            return response.json()
        elif response.status_code == 429:
            print(f"[WARN] API rate limited (429), waiting...")
            time.sleep(60)  # 等待1分钟
            return None
        elif response.status_code == 401:
            print(f"[ERROR] Unauthorized (401), check Bearer Token")
            return None
        else:
            print(f"[ERROR] API error: {response.status_code}")
            print(f"[ERROR] Response: {response.text[:500]}")
            return None
            
    except Exception as e:
        print(f"[ERROR] Request failed: {e}")
        return None

def parse_tweets(api_response, keyword):
    """解析API响应，提取推文数据"""
    if not api_response or 'data' not in api_response:
        return []
    
    tweets = api_response.get('data', [])
    users = {u['id']: u for u in api_response.get('includes', {}).get('users', [])}
    
    parsed_tweets = []
    
    for tweet in tweets:
        author_id = tweet.get('author_id', '')
        author = users.get(author_id, {})
        
        metrics = tweet.get('public_metrics', {})
        
        parsed = {
            'id': tweet.get('id'),
            'keyword': keyword,
            'author_id': author_id,
            'author_username': author.get('username', 'unknown'),
            'author_name': author.get('name', 'Unknown'),
            'text': tweet.get('text', ''),
            'created_at': tweet.get('created_at', ''),
            'likes': metrics.get('like_count', 0),
            'retweets': metrics.get('retweet_count', 0),
            'replies': metrics.get('reply_count', 0),
            'quotes': metrics.get('quote_count', 0),
            'url': f"https://twitter.com/{author.get('username', '')}/status/{tweet.get('id')}",
            'fetched_at': datetime.now().isoformat()
        }
        
        parsed_tweets.append(parsed)
    
    return parsed_tweets

def fetch_x_ai_trending():
    """
    抓取X上泛AI类热门推文
    返回按点赞数排序的推文列表
    """
    print("[INFO] X AI trending fetch started (Twitter API v2)")
    print(f"[INFO] Keywords: {', '.join(AI_KEYWORDS[:5])}...")
    print(f"[INFO] Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    all_tweets = []
    
    # 每个关键词抓取 (限制前5个关键词避免超限)
    for keyword in AI_KEYWORDS[:5]:
        print(f"\n[INFO] Searching: {keyword}")
        
        api_response = search_tweets(keyword, max_results=10)
        
        if api_response:
            tweets = parse_tweets(api_response, keyword)
            print(f"[SUCCESS] Got {len(tweets)} tweets for '{keyword}'")
            all_tweets.extend(tweets)
        else:
            print(f"[WARN] Failed to fetch for '{keyword}'")
        
        # API限流: 每15分钟450次请求
        # 我们保守一点，每次请求间隔2秒
        time.sleep(2)
    
    # 按点赞数排序
    all_tweets.sort(key=lambda x: x.get('likes', 0), reverse=True)
    
    # 去重 (同一ID)
    seen_ids = set()
    unique_tweets = []
    for t in all_tweets:
        if t['id'] not in seen_ids:
            seen_ids.add(t['id'])
            unique_tweets.append(t)
    
    # 只保留当天发布的
    today = datetime.now().date()
    today_tweets = [
        t for t in unique_tweets 
        if datetime.fromisoformat(t['created_at'].replace('Z', '+00:00')).date() == today
    ]
    
    result = {
        'fetch_time': datetime.now().isoformat(),
        'status': 'success',
        'keywords': AI_KEYWORDS[:5],
        'total_fetched': len(all_tweets),
        'unique_count': len(unique_tweets),
        'today_count': len(today_tweets),
        'tweets': today_tweets[:20]  # 返回Top 20
    }
    
    print(f"\n{'='*50}")
    print(f"[SUCCESS] Total fetched: {len(all_tweets)}")
    print(f"[SUCCESS] Unique tweets: {len(unique_tweets)}")
    print(f"[SUCCESS] Today's tweets: {len(today_tweets)}")
    print(f"{'='*50}")
    
    return result

def save_data(data):
    """保存数据到文件"""
    if not data or data.get('status') != 'success':
        print("[ERROR] No valid data to save")
        return None
    
    os.makedirs(DATA_DIR, exist_ok=True)
    
    timestamp = datetime.now()
    filename = f"x_trending_{timestamp.strftime('%Y%m%d_%H')}.json"
    filepath = os.path.join(DATA_DIR, filename)
    
    # 同时更新latest
    latest_path = os.path.join(DATA_DIR, "x_trending_latest.json")
    
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    with open(latest_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    print(f"[INFO] Data saved to: {filepath}")
    print(f"[INFO] Latest updated: {latest_path}")
    
    return filepath

def main():
    """主函数"""
    print("=" * 60)
    print("X(Twitter) AI Trending Fetch (Twitter API v2)")
    print(f"Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 60)
    
    # 加载环境变量
    if not load_env():
        print("[ERROR] Failed to load .env.twitter")
        return 1
    
    try:
        data = fetch_x_ai_trending()
        if data and data.get('status') == 'success':
            filepath = save_data(data)
            if filepath:
                print(f"\n[COMPLETE] Fetch completed successfully!")
                print(f"[COMPLETE] File: {filepath}")
                return 0
        else:
            print("[ERROR] Fetch failed")
            return 1
    except Exception as e:
        print(f"[ERROR] Fatal error: {e}")
        import traceback
        traceback.print_exc()
        return 1

if __name__ == "__main__":
    sys.exit(main())
