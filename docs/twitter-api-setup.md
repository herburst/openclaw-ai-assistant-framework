# Twitter API v2 申请指南

> 用于WF助手抓取X(Twitter)泛AI热门推文

---

## 📝 申请步骤

### 1. 创建Twitter开发者账号
1. 访问 https://developer.twitter.com/
2. 登录你的Twitter账号
3. 点击 "Apply for a developer account"
4. 选择用途: **Research / Academic** 或 **Student / Learning**

### 2. 填写申请信息

**Q: How will you use the Twitter API?**

```
I am an AI content creator and researcher with nearly 50,000 followers, focusing on ComfyUI, AI image/video generation, and general AI technology trends. I plan to use the Twitter API to build an AI intelligence monitoring system that tracks trending AI-related tweets daily. This system will help me:

1. Monitor the latest AI technology developments and trending topics globally
2. Analyze popular AI tools and applications that my audience cares about
3. Create better educational content by understanding what AI topics are currently resonating with the community
4. Curate relevant AI news and insights for my followers on Chinese platforms

I will use the API for read-only access to public tweets, specifically searching for keywords like AI, ChatGPT, Midjourney, ComfyUI, and other AI-related terms. The data will be used solely for content research and trend analysis, not for commercial purposes or sentiment analysis.

The system will run 4 times daily (at 06:00, 12:00, 18:00, and 00:00 UTC+8) to capture trending content, with an estimated monthly usage of approximately 2,400 tweet reads, well within the Essential access limits.
```

**Q: Will your app use Twitter content to analyze sentiments?**

```
No, I will not use Twitter content for sentiment analysis. My application only requires basic metadata from tweets such as the author's username, tweet text, creation timestamp, and public engagement metrics (likes, retweets, replies). 

The purpose is purely for trend monitoring and content curation. I need to identify which AI-related topics are trending based on engagement levels, not analyze the sentiment or opinions expressed in the tweets. No natural language processing or sentiment classification will be performed on the tweet content.
```

**Q: Will your app display Twitter content?**

```
Yes, my application will display Twitter content, but in a limited and transformative way. Specifically:

1. Tweet summaries will be included in my personal monitoring dashboard to help me track trending topics
2. Engagement metrics (like counts, retweet counts) will be displayed to identify trending content
3. Author attribution will always be included when referencing specific tweets
4. The displayed content will be used solely for my content creation research and will not be publicly redistributed as a tweet aggregation service

I understand and will comply with Twitter's Developer Agreement and Policy regarding content display. All usage will respect user privacy and Twitter's terms of service. The content will help me create original commentary and educational content about AI trends for my Chinese-speaking audience, not simply repost Twitter content.
```

### 3. 创建Project和App
1. 创建新项目: "WF助手AI监控"
2. 创建新App: "x-ai-monitor"
3. 获取API Keys:
   - Bearer Token
   - API Key
   - API Secret

### 4. 权限设置
- 选择 **Read-only** 权限即可
- 不需要Elevated权限

---

## 🔑 需要的凭证

申请完成后，需要保存以下信息到安全位置：

```bash
# 需要保存到配置文件
TWITTER_BEARER_TOKEN=your_bearer_token_here
TWITTER_API_KEY=your_api_key_here
TWITTER_API_SECRET=your_api_secret_here
```

---

## 📊 免费额度 (Essential Access)

| 限制 | 数量 |
|------|------|
| 每月推文读取 | 5,000条 |
| 每天请求次数 | 100次 |
| 足够我们的需求 | ✅ 是 |

**我们的需求:**
- 每天4次抓取 × 每次20条 = 每天80条
- 每月: 80 × 30 = 2,400条
- 剩余额度: 5,000 - 2,400 = 2,600条 ✅

---

## ⚡ 快速验证脚本

获取凭证后，用以下脚本测试：

```python
import requests
import os

bearer_token = os.environ.get("TWITTER_BEARER_TOKEN")
headers = {"Authorization": f"Bearer {bearer_token}"}

# 搜索AI相关推文
url = "https://api.twitter.com/2/tweets/search/recent"
params = {
    "query": "AI -is:retweet lang:en",
    "max_results": 10,
    "tweet.fields": "created_at,public_metrics,author_id"
}

response = requests.get(url, headers=headers, params=params)
print(response.json())
```

---

## 🎯 下一步

1. 申请开发者账号 (约10-30分钟)
2. 等待审核通过 (通常即时或几小时)
3. 创建App获取凭证
4. 把凭证发给我，我配置到WF助手

**有问题随时问我！**
