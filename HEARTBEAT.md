# HEARTBEAT.md - 系统事件处理

## 系统事件响应规则

当收到以下系统事件时，执行对应操作：

### run_skill_learning
**触发**: 每小时整点
**操作**: 
```bash
cd ~/.openclaw/workspace && node learn-skill.js >> learn-cron.log 2>&1
```
**说明**: 从SkillsMP搜索并学习一个新技能

### fetch_bilibili_tech
**触发**: 每天 10:00 和 22:00
**操作**:
```bash
cd ~/.openclaw/workspace && python3 scripts/bilibili-tech-fetch.py
```
**说明**: 爬取B站科技区AI视频数据

### fetch_bilibili_account
**触发**: 每天 09:00
**操作**:
```bash
cd ~/.openclaw/workspace && python3 scripts/bilibili-account-fetch.py
```
**说明**: 获取老鱼B站个人账号数据（粉丝、播放、视频表现）

### fetch_ai_intelligence
**触发**: 每天 09:00
**操作**:
```bash
cd ~/.openclaw/workspace && python3 scripts/ai-intelligence-monitor.py
```
**说明**: 泛AI情报监控（B站全站AI相关内容，不限分区）

### fetch_x_ai_trending
**触发**: 每天 06:00, 12:00, 18:00, 00:00 (每天4次)
**操作**:
```bash
cd ~/.openclaw/workspace && python3 scripts/x-ai-trending-fetch.py
```
**说明**: 抓取X(Twitter)泛AI类热门推文，按点赞数排序，每日最新

### generate_daily_report
**触发**: 每天 09:30
**操作**:
```bash
cd ~/.openclaw/workspace && python3 scripts/generate-daily-report.py
```
**说明**: 生成统一每日汇报（包含账号数据、AI情报、技能学习）

### git_backup
**触发**: 每30分钟
**操作**:
```bash
cd ~/.openclaw/workspace && git add . && git commit -m "auto: $(date +%Y-%m-%d-%H:%M) backup" && git push origin main 2>/dev/null || true
```
**说明**: 自动备份工作区到Git

## 每日汇报时间线

| 时间 | 任务 | 产出 |
|------|------|------|
| 06:00 | X(Twitter)AI热门 | 国际AI热点 |
| 09:00 | B站账号数据获取 | 个人账号报告 |
| 09:00 | 泛AI情报监控 | 全站AI热门 |
| 09:30 | 生成统一汇报 | 完整日报 |
| 09:35 | 同步到飞书 | Wiki更新 |
| 10:00 | B站科技区爬取 | 国内AI视频 |
| 12:00 | X(Twitter)AI热门 | 国际AI热点 |
| 18:00 | X(Twitter)AI热门 | 国际AI热点 |
| 22:00 | B站科技区爬取 | 国内AI视频 |
| 00:00 | X(Twitter)AI热门 | 国际AI热点 |

## 汇报内容模块

- **B站账号数据**: 粉丝数、播放量、视频表现（Cookie登录获取）
- **B站全站AI**: AI热门视频Top 10（全站关键词搜索）
- **X(Twitter)AI**: 热门推文Top 10（国际热点）
- **技能学习**: 今日学习的新技能（每小时学习记录）
- **系统状态**: 定时任务运行状态监控
- **选题建议**: 基于双源数据的选题推荐

## 存储位置

- **飞书主汇报页**: https://acnh7t5exjqh.feishu.cn/wiki/FcvTwZTTyiCZ30kNLRVchfiwnKd
- **本地主备份**: `data/daily-reports/daily_report_YYYYMMDD.md`
- **快捷查看最新**: `data/daily-reports/daily_report_latest.md`
- **X数据存储**: `data/x-ai-trending/x_trending_YYYYMMDD_HH.json`

## 常规Heartbeat检查

如果收到常规 heartbeat（无特定事件），检查：
1. 定时任务状态 - `openclaw cron list`
2. 磁盘空间使用情况
3. 最近的错误日志

如一切正常，回复: HEARTBEAT_OK
