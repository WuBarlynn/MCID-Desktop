import { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import CategoryPage from './components/CategoryPage';
import AboutPage from './components/AboutPage';
import './App.css';

const CATEGORIES = [
  { id: 'BAI', name: '方块与物品' },
  { id: 'entities', name: '实体与生物' },
  { id: 'biome', name: '生物群系' },
  { id: 'structure', name: '结构' },
  { id: 'potion', name: '药水' },
  { id: 'enchantedBook', name: '附魔书' },
  { id: 'banner', name: '旗帜图案' },
  { id: 'tippedArrow', name: '药箭' },
  { id: 'painting', name: '画作' },
  { id: 'goatHorn', name: '山羊角' },
  { id: 'mobEffect', name: '状态效果' },
  { id: 'particle', name: '粒子效果' },
];

function AppContent() {
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    if (isLightMode) {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [isLightMode]);

  return (
    <div className="app-container">
      <nav className="sidebar">
        <div className="sidebar-brand" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', paddingRight: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div className="logo-box">
            </div>
            <h2 style={{ fontSize: '1.2rem', margin: 0, lineHeight: 1.2 }}>MCID<br/>工具箱</h2>
          </div>
          <button 
            onClick={() => setIsLightMode(!isLightMode)}
            style={{
              background: 'transparent',
              border: '2px solid #ffffff',
              color: '#ffffff',
              padding: '0.2rem 0.5rem',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontFamily: 'monospace'
            }}
            title={isLightMode ? "切换暗色模式" : "切换浅色模式"}
          >
            {isLightMode ? '☀️' : '🌙'}
          </button>
        </div>
        <div className="sidebar-links">
          {CATEGORIES.map(cat => (
            <NavLink 
              key={cat.id} 
              to={`/category/${cat.id}`}
              className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}
            >
              {cat.name}
            </NavLink>
          ))}
        </div>
        
        <div className="sidebar-footer" style={{ padding: '1rem', borderTop: '4px solid #164916', background: 'rgba(0,0,0,0.2)' }}>
          <NavLink 
            to="/about"
            className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}
            style={{ textAlign: 'center', justifyContent: 'center' }}
          >
            关于 / 版权声明
          </NavLink>
        </div>
      </nav>

      <div className="content-area">
        <Routes>
          <Route path="/" element={<Navigate to="/category/BAI" replace />} />
          <Route path="/category/:catId" element={<CategoryPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
}
