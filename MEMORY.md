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

### 已掌握技能 (30个+)
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
- content-creator - 内容创作
- content-design - 内容设计
- write-docs - 文档撰写

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
- nano-banana-pro - 视频处理
- prompt-lookup - 提示词查找

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

### 推荐学习方向 (视频管家需求)
- "prompt" - 提示词工程 (奇数小时优先匹配)
- "story" / "narrative" - 叙事结构
- "film" / "cinema" - 电影镜头语言
- "video editing" / "continuity" - 剪辑连贯性

### 设计模式收获
1. **TDD可视化** - RED-GREEN-REFACTOR循环
2. **分层工作流** - Inspect → Search → Lookup → Create → Validate
3. **渐进式披露** - 核心操作在SKILL.md，高级功能在REFERENCE.md
4. **触发条件详尽** - 列举所有可能的用户意图和关键词
5. **质量门禁** - 强制脚本检查 + 错误报告

---

## 管家体系架构 [2026-02-25]

### 组织架构
**大管家**: WF助手 (总指挥)  
**五个小管家**:
- 🎓 学习管家 - SkillsMP技能学习
- 📊 数据管家 - B站数据爬取分析  
- ✍️ 内容管家 - 自媒体内容策略
- 🎬 视频管家 - 短剧分镜 + **审查员系统**
- ⚙️ 系统管家 - 定时任务 + 备份同步

### 视频管家 - 审查员系统
- **强制审查**: 所有生成分镜必须经过逻辑校对
- **7维度检查**: 动作/场景/时间/服装/位置/道具/情绪
- **评分等级**: 优秀(90+)/良好(70+)/及格(50+)/不及格(<50)
- **学习进化**: 自动收集错误案例，每周迭代规则
- **学习资产**: `video-learning/` 目录 (errors/patterns/rules/insights)

### 使用方式
- 单管家: `[管家名] [指令]`  如: `视频管家 分镜 [内容]`
- 总控: `大管家 [指令]`      如: `大管家 汇报`

---

## 系统配置

### 定时任务 (7个)
| 任务 | 频率 | 状态 |
|------|------|------|
| skillsmp-learner | 每小时 | 运行中 |
| bilibili-tech-fetch | 每天10:00/22:00 | 运行中 |
| bilibili-account-fetch | 每天09:00 | 运行中 |
| x-ai-trending-fetch | 每天4次 | 待实现 |
| ai-intelligence-monitor | 每天09:00 | 运行中 |
| daily-report-gen | 每天09:30 | 运行中 |
| auto-git-backup | 每30分钟 | 运行中 |

### 管家配置文件
| 管家 | 配置文件 |
|------|----------|
| 学习管家 | `managers/manager-skills.md` |
| 数据管家 | `managers/manager-data.md` |
| 内容管家 | `managers/manager-content.md` |
| 视频管家 | `managers/manager-video.md` |
| 系统管家 | `managers/manager-system.md` |

### 默认模型
- **主模型**: moonshot/kimi-k2.5 (OpenClaw)
- **备用**: kimi-coding/kimi-k2-thinking

---

## 待办事项

### 高优先级
- [ ] X(Twitter) API额度问题 (402 CreditsDepleted，需检查账户配置)
- [ ] 等待Kimi API速率限制恢复
- [ ] VirusTotal标记问题 - 影响高评分技能安装

### 进行中
- [x] 每小时技能学习系统部署
- [x] 管家体系架构部署 [2026-02-25]
- [x] B站短剧区 → X(Twitter)AI监控 [2026-02-25]
- [ ] X数据获取 (Nitter测试失败，尝试备用方案)
- [ ] 飞书消息读取配置（回调地址模式）

### 视频管家待办
- [ ] 实际测试分镜生成+审查流程
- [ ] 收集第一批错误案例
- [ ] 首次规则迭代 (周日20:00)

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

_记忆更新时间: 2026-02-25_  
_来源: 历史对话记录 + 管家体系部署_  
_修正: 泛AI监控调整为全站 (不限科技区)_