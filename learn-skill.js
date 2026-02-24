const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const SKILL_CATEGORIES = {
  video_image: ['video', 'image', 'frame', 'camera', 'photo', 'picture', 'visual', 'comfyui', 'generate', 'ai'],
  content: ['summarize', 'content', 'write', 'blog', 'social', 'media', 'article', 'text', 'copy'],
  automation: ['github', 'coding', 'agent', 'script', 'automate', 'workflow', 'bot', 'cron'],
  data: ['analysis', 'log', 'usage', 'data', 'google', 'workspace', 'excel', 'sheet', 'csv']
};

async function learnSkill() {
  const now = new Date();
  const hour = now.getHours();
  const timeStr = now.toLocaleString('zh-CN', { hour12: false });
  
  console.log(`[${timeStr}] 📚 开始学习新技能...`);
  
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  let bestSkill = null;
  let skillDetails = '';
  let categoryName = '';
  let searchQuery = '';
  
  try {
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    await page.setViewport({ width: 1280, height: 800 });
    
    // 根据当前时间决定类别
    let category;
    
    if (hour % 2 === 0) {
      // 偶数小时：视频/图片类 (12个)
      category = 'video_image';
      categoryName = '🎬 视频/图片';
    } else {
      // 奇数小时：其他类别轮换
      const otherCats = [
        { key: 'content', name: '✍️ 内容创作' },
        { key: 'automation', name: '⚙️ 自动化' },
        { key: 'data', name: '📊 数据分析' }
      ];
      const selected = otherCats[Math.floor(hour / 2) % 3];
      category = selected.key;
      categoryName = selected.name;
    }
    
    const searchTerms = SKILL_CATEGORIES[category];
    searchQuery = searchTerms[Math.floor(Math.random() * searchTerms.length)];
    
    console.log(`  → 类别: ${categoryName}`);
    console.log(`  → 搜索: "${searchQuery}"`);
    
    // 访问首页，使用搜索框
    await page.goto('https://skillsmp.com/zh', { 
      waitUntil: 'networkidle2', 
      timeout: 60000 
    });
    await new Promise(r => setTimeout(r, 5000));
    
    // 使用搜索框
    const searchInput = await page.$('input[placeholder*="Search"]');
    if (searchInput) {
      await searchInput.click();
      await searchInput.type(searchQuery);
      await page.keyboard.press('Enter');
      // 等待搜索结果加载
      await new Promise(r => setTimeout(r, 10000));
    } else {
      // 备选：直接访问搜索URL
      await page.goto(`https://skillsmp.com/zh?q=${encodeURIComponent(searchQuery)}`, { 
        waitUntil: 'networkidle2', 
        timeout: 60000 
      });
      await new Promise(r => setTimeout(r, 8000));
    }
    
    // 截图记录
    await page.screenshot({ 
      path: `/home/zzyuzhangxing/.openclaw/workspace/search-${hour}.png`,
      fullPage: false 
    });
    
    // 获取技能列表
    const skills = await page.evaluate(() => {
      const results = [];
      const skillLinks = document.querySelectorAll('a[href*="/skills/"]');
      
      skillLinks.forEach(link => {
        const href = link.href;
        const fullText = link.innerText?.trim() || '';
        
        // 解析URL获取技能名称
        const match = href.match(/\/skills\/(.+?)(?:\?|$)/);
        if (match && !href.includes('facebook-react')) { // 过滤掉facebook的示例
          const skillPath = match[1];
          const lines = fullText.split('\n').map(l => l.trim()).filter(l => l);
          
          // 提取技能名称和热度
          let name = lines[0] || skillPath;
          let stars = '';
          
          // 找到包含 k 的行（表示热度/使用量）
          for (const line of lines) {
            if (/\d+\.?\d*k/.test(line) && line.length < 10) {
              stars = line;
              break;
            }
          }
          
          results.push({
            name: name.replace('.md', '').substring(0, 40),
            stars: stars,
            link: href,
            path: skillPath,
            preview: fullText.substring(0, 100)
          });
        }
      });
      
      // 去重并限制数量
      const seen = new Set();
      return results.filter(s => {
        if (seen.has(s.path)) return false;
        seen.add(s.path);
        return true;
      }).slice(0, 8);
    });
    
    console.log(`  → 找到 ${skills.length} 个相关技能`);
    
    if (skills.length > 0) {
      // 按热度排序，选择最热门的
      bestSkill = skills.sort((a, b) => {
        const getValue = (s) => {
          const match = s.stars?.match(/([\d.]+)k/);
          return match ? parseFloat(match[1]) : 0;
        };
        return getValue(b) - getValue(a);
      })[0];
      
      console.log(`  → 选择学习: ${bestSkill.name} (${bestSkill.stars})`);
      
      // 访问技能详情页
      await page.goto(bestSkill.link, { waitUntil: 'networkidle2', timeout: 60000 });
      await new Promise(r => setTimeout(r, 6000));
      
      // 获取详情页内容
      const pageInfo = await page.evaluate(() => {
        // 获取标题
        const title = document.querySelector('h1')?.innerText?.trim() || '';
        
        // 获取描述
        let description = '';
        const descEl = document.querySelector('p, .prose p, [data-description]');
        if (descEl) {
          description = descEl.innerText?.substring(0, 400) || '';
        }
        
        // 尝试找到SKILL.md内容
        let readme = '';
        const preBlocks = document.querySelectorAll('pre, code');
        for (const block of preBlocks) {
          const text = block.innerText;
          if ((text.includes('#') && text.includes('SKILL')) || 
              text.includes('## Description') || 
              text.includes('## Usage')) {
            readme = text.substring(0, 2000);
            break;
          }
        }
        
        return { title, description, readme };
      });
      
      skillDetails = pageInfo.readme || pageInfo.description || pageInfo.title;
      
      // 如果内容太少，尝试获取更多
      if (skillDetails.length < 50) {
        const bodyText = await page.evaluate(() => {
          return document.body.innerText?.substring(0, 800) || '';
        });
        skillDetails = bodyText;
      }
      
      console.log(`  → 学习完成 (${skillDetails.length} 字符内容)`);
    } else {
      console.log(`  → 未找到相关技能，尝试备选关键词...`);
      // 备选：使用通用关键词
      searchQuery = 'ai';
    }
    
  } catch (error) {
    console.error(`  ✗ 错误: ${error.message}`);
  }
  
  // 记录学习结果
  try {
    const logEntry = {
      timestamp: now.toISOString(),
      hour: hour,
      category: categoryName,
      searchQuery: searchQuery,
      skillLearned: bestSkill || { name: '搜索中', stars: '-', link: '' },
      details: skillDetails.substring(0, 800)
    };
    
    // 保存到JSON日志
    const logPath = path.join(process.env.HOME, '.openclaw/workspace/skills-learning-log.json');
    let logs = [];
    if (fs.existsSync(logPath)) {
      logs = JSON.parse(fs.readFileSync(logPath, 'utf8'));
    }
    logs.push(logEntry);
    fs.writeFileSync(logPath, JSON.stringify(logs, null, 2));
    
    // 更新计划文件
    const planPath = path.join(process.env.HOME, '.openclaw/workspace/skills-learning-plan.md');
    if (fs.existsSync(planPath)) {
      let plan = fs.readFileSync(planPath, 'utf8');
      
      const skillName = bestSkill?.name || '搜索中...';
      const skillStars = bestSkill?.stars || '-';
      const newRow = `| ${hour}:00 | ${skillName} | ${categoryName} | ✓ 已学习 | 热度:${skillStars} |\n`;
      
      // 更新今日进度表格
      if (plan.includes('| 待开始 |')) {
        plan = plan.replace('| 待开始 | - | - | - | - |\n', newRow);
      } else if (!plan.includes(`| ${hour}:00 |`)) {
        const lines = plan.split('\n');
        const tableStart = lines.findIndex(l => l.includes('## 今日学习进度'));
        if (tableStart >= 0) {
          for (let i = tableStart; i < Math.min(tableStart + 10, lines.length); i++) {
            if (lines[i].includes('|--')) {
              lines.splice(i + 1, 0, newRow.trim());
              break;
            }
          }
          plan = lines.join('\n');
        }
      }
      
      fs.writeFileSync(planPath, plan);
    }
    
  } catch (err) {
    console.error(`  ✗ 记录失败: ${err.message}`);
  }
  
  await browser.close();
  
  // 最终汇报
  console.log(`\n╔════════════════════════════════════╗`);
  console.log(`║      📚 每小时技能学习汇报      ║`);
  console.log(`╠════════════════════════════════════╣`);
  console.log(`║ ⏰ 时间: ${String(hour).padStart(2, '0')}:00                      ║`);
  console.log(`║ 📂 类别: ${categoryName.padEnd(20)} ║`);
  console.log(`║ 🔍 搜索: "${searchQuery.padEnd(18)}" ║`);
  if (bestSkill) {
    const name = bestSkill.name.substring(0, 20).padEnd(20);
    console.log(`║ 📚 技能: ${name} ║`);
    console.log(`║ ⭐ 热度: ${bestSkill.stars.padEnd(20)} ║`);
  } else {
    console.log(`║ 📚 技能: 搜索进行中...${' '.repeat(8)} ║`);
  }
  console.log(`╚════════════════════════════════════╝\n`);
  
  console.log(`[${timeStr}] ✅ 学习周期完成\n`);
}

learnSkill();
