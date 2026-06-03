export default function AboutPage() {
  return (
    <div className="page-content about-page">
      <header>
        <div className="filter-section">
          <h2>关于及版权声明</h2>
        </div>
      </header>
      
      <main className="main-content" style={{ padding: '2rem', overflowY: 'auto' }}>
        <div className="item-card" style={{ display: 'block', padding: '2rem', maxWidth: '800px', cursor: 'default', height: 'auto', background: 'var(--card-bg)' }}>
          <h2 style={{ color: 'var(--card-title)', borderBottom: '2px dashed var(--mc-border-dark)', paddingBottom: '0.5rem', marginTop: 0 }}>MCID 工具箱</h2>
          
          <div style={{ marginTop: '1.5rem', lineHeight: '1.8', color: 'var(--card-text-main)', fontSize: '1.1rem' }}>
            <p><strong>开源协议：</strong> MIT License</p>
            <div style={{
              background: 'var(--id-row-bg)',
              padding: '1rem',
              borderRadius: '8px',
              border: '1px solid var(--card-border-dark)',
              fontSize: '0.85rem',
              fontFamily: 'monospace',
              lineHeight: '1.4',
              height: '150px',
              overflowY: 'auto',
              whiteSpace: 'pre-wrap',
              marginBottom: '1rem',
              color: 'var(--card-text-main)'
            }}>
{`The MIT License (MIT)

Copyright (c) 2023-2026 暮风径羽

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

========================================================================

MIT License

Copyright (c) 2026 WuBarlynn

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`}
            </div>
            <p>
              本项目是由 <strong>暮风径羽</strong> 授权的二次开发项目。
            </p>
            <p>
              所有的信息数据（包括方块物品 ID、实体数据、群系、结构、图片素材等）均来源于：
              <br />
              <a 
                href="https://mcid.lingningyu.cn/" 
                target="_blank" 
                rel="noreferrer"
                style={{ color: '#5555ff', textDecoration: 'underline', fontWeight: 'bold' }}
              >
                https://mcid.lingningyu.cn/
              </a>
            </p>

            <p>
              <strong>开源地址：</strong>
              <br />
              <a 
                href="https://github.com/WuBarlynn/MCID-Desktop" 
                target="_blank" 
                rel="noreferrer"
                style={{ color: '#5555ff', textDecoration: 'underline', fontWeight: 'bold' }}
              >
                https://github.com/WuBarlynn/MCID-Desktop
              </a>
            </p>
            
            <p style={{ marginTop: '2rem', color: 'var(--card-en-title)', fontSize: '0.9rem' }}>
              Minecraft is a trademark of Mojang Synergies AB. <br/>
              This project is not affiliated with or endorsed by Mojang.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
