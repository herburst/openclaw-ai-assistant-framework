# 经验总结机制（集成到Heartbeat）

## 每次Heartbeat时执行

```python
def summarize_experience():
    """总结最近30分钟的经验"""
    
    # 1. 检查最近完成的任务
    recent_tasks = get_recent_tasks(30)  # 最近30分钟
    
    # 2. 分析成功经验
    for task in recent_tasks:
        if task['status'] == 'success':
            experience = {
                'type': 'success',
                'task': task['name'],
                'experience': '成功完成任务',
                'improvement': '可以推广到类似任务'
            }
            save_experience(experience)
    
    # 3. 分析失败教训
    for task in recent_tasks:
        if task['status'] == 'failed':
            experience = {
                'type': 'failure',
                'task': task['name'],
                'experience': f'失败原因: {task["error"]}',
                'improvement': '需要改进策略'
            }
            save_experience(experience)
    
    # 4. 记录到经验日志
    save_to_experience_log()
```

---
_创建时间：2026-02-28 16:22_
