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
