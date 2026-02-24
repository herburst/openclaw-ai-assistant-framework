# MEMORY.md - 长期记忆

## 关于老鱼

**身份**: AI自媒体博主  
**粉丝量**: 近5万  
**主要方向**: 
- ComfyUI (AI图像/视频生成)
- Seedence (新兴平台)
- 泛AI类内容

**工作风格**:
- 系统化思维，注重记录和复盘
- 喜欢详细的技能学习笔记
- 重视风控和成本效益
- 数据驱动决策 (B站数据爬取分析)

**技术栈**:
- Python (主要开发语言)
- 飞书生态 (文档、知识库、任务)
- OpenClaw/Claude (AI助手)
- ComfyUI (AI绘图工作流)

---

## 重要决策记录

### 2026-02-23 飞书 vs Kimi 分工
- **飞书**: 完整功能（定时任务、管家汇报、RSS推送、心跳检测）
- **Kimi**: 仅对话功能，无自动化能力
- **核心**: 泛AI区（科技区188）数据爬取 - 用于热点策略

### 2026-02-24 任务精简
- 从9个定时任务合并为8个
- system-ops-daily-report + self-check-review → system-ops-daily-report-merged
- 数据爬取优先级: 泛AI区 > 短剧区 > 个人账号

### 2026-02-24 B站分区问题
- rid=217 实际对应萌宠区而非短剧区
- 需要确认正确的短剧区分区ID

---

## 技能学习历史

### 已掌握技能 (27个+)
**编程开发:**
- python (v1.0.0) - Python最佳实践
- python-patterns - 设计模式与惯用写法
- python-testing - pytest + TDD测试策略
- python-typing-patterns - 类型提示最佳实践
- coding-agent - 代码代理

**生产力工具:**
- pdf - PDF处理（pypdf, pdfplumber, reportlab）
- xlsx - Excel/电子表格处理
- notion - 笔记管理
- obsidian - 知识库管理

**内容创作:**
- tweet-writer - 病毒式推文撰写（X算法优化）
- writer - AI写作陷阱修复
- chinese-writing - 中文写作风格学习
- summarize - 内容摘要

**自动化:**
- github - GitHub操作
- activecampaign-automation - CRM营销自动化
- netsuite-automation - ERP自动化
- coding-agent - 代码代理

**数据分析:**
- exploratory-data-analysis - 探索性数据分析
- polars - 高性能数据处理
- model-usage - 模型使用分析
- session-logs - 会话日志分析

**DevOps运维:**
- docker-essentials - Docker容器管理
- kubernetes - K8s集群管理
- terraform - IaC基础设施即代码
- devops - CI/CD最佳实践

**多媒体:**
- video-frames - 视频帧提取
- camsnap - 摄像头捕获
- songsee - 音频可视化

**系统运维:**
- healthcheck - 系统安全检查
- skill-creator - 技能创建

---

## SkillsMP学习策略

### 学习模式
- **频率**: 每小时学习1个新技能
- **分配**: 
  - 12个/天: 视频/图片类 (偶数小时)
  - 12个/天: 内容/自动化/数据类 (奇数小时轮换)
- **标准**: 评分最高 + 对自媒体有帮助
- **深度**: 安装依赖 + 阅读SKILL.md + 理解用法

### 设计模式收获
1. **TDD可视化** - RED-GREEN-REFACTOR循环
2. **分层工作流** - Inspect → Search → Lookup → Create → Validate
3. **渐进式披露** - 核心操作在SKILL.md，高级功能在REFERENCE.md
4. **触发条件详尽** - 列举所有可能的用户意图和关键词
5. **质量门禁** - 强制脚本检查 + 错误报告

---

## 系统配置

### 定时任务 (8个)
| 任务 | 频率 | 状态 |
|------|------|------|
| skillsmp-learner | 每小时 | 运行中 |
| auto-skill-installer | 每小时 | 运行中 |
| bilibili-tech-fetch | 每天10:00/22:00 | 运行中 |
| bilibili-short-drama-fetch | 每天11:00/23:00 | 运行中 |
| short-drama-daily-report | 每天21:00 | 运行中 |
| system-ops-daily-report-merged | 每天09:00 | 运行中 |
| auto-git-backup | 每30分钟 | 运行中 |
| daily-chat-backup | 每天02:00 | 运行中 |

### 默认模型
- **主模型**: moonshot/kimi-k2.5 (OpenClaw)
- **备用**: kimi-coding/kimi-k2-thinking

---

## 待办事项

### 高优先级
- [ ] 确认B站短剧区正确的分区ID (rid≠217)
- [ ] 等待Kimi API速率限制恢复
- [ ] VirusTotal标记问题 - 影响高评分技能安装

### 进行中
- [x] 每小时技能学习系统部署
- [ ] 飞书消息读取配置（回调地址模式）

---

## 个性化偏好

**沟通风格**:
- 喜欢简洁、结构化的汇报
- 重视"为什么"的解释
- 需要具体的执行计划而非抽象建议

**决策习惯**:
- 数据驱动（爬取数据支撑决策）
- 成本敏感（避免不必要的代理费用）
- 风控优先（IP被风控时选择等待而非绕过）

**技术偏好**:
- 公式 > 硬编码（Excel公式优先）
- 分层工具链（按场景选择最佳工具）
- 脚本化自动化（减少手动操作）

---

_记忆更新时间: 2026-02-24_  
_来源: 历史对话记录 + Kimi交互记忆库整合_
