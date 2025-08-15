<template>
  <div class="blog-container">
    <!-- 背景装饰 -->
    <div class="background-decoration">
      <div class="floating-shape shape-1"></div>
      <div class="floating-shape shape-2"></div>
      <div class="floating-shape shape-3"></div>
    </div>

    <!-- 头部区域 -->
    <header class="blog-header">
      <div class="header-content">
        <h1 class="blog-title">
          <span class="title-gradient">Oscar's</span>
          <span class="title-subtitle">创意空间</span>
        </h1>
        <p class="blog-description">分享技术、生活与创意的个人博客</p>
        <div class="header-stats">
          <div class="stat-item">
            <span class="stat-number">128</span>
            <span class="stat-label">文章</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">15.2k</span>
            <span class="stat-label">阅读</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">892</span>
            <span class="stat-label">评论</span>
          </div>
        </div>
      </div>
    </header>

    <!-- 导航栏 -->
    <nav class="blog-nav">
      <div class="nav-container">
        <div class="nav-categories">
          <button class="nav-btn active" @click="filterCategory('all')">全部</button>
          <button class="nav-btn" @click="filterCategory('tech')">技术</button>
          <button class="nav-btn" @click="filterCategory('life')">生活</button>
          <button class="nav-btn" @click="filterCategory('design')">设计</button>
          <button class="nav-btn" @click="filterCategory('creative')">创意</button>
        </div>
        <div class="search-box">
          <input type="text" placeholder="搜索文章..." v-model="searchQuery" class="search-input">
          <button class="search-btn">🔍</button>
        </div>
      </div>
    </nav>

    <!-- 主要内容区域 -->
    <main class="blog-main">
      <div class="content-grid">
        <!-- 特色文章 -->
        <article class="featured-article" v-if="featuredArticle">
          <div class="featured-image">
            <img :src="featuredArticle.image" :alt="featuredArticle.title">
            <div class="featured-overlay">
              <span class="featured-badge">精选</span>
            </div>
          </div>
          <div class="featured-content">
            <div class="article-meta">
              <span class="category-tag">{{ featuredArticle.category }}</span>
              <span class="publish-date">{{ featuredArticle.date }}</span>
            </div>
            <h2 class="article-title">{{ featuredArticle.title }}</h2>
            <p class="article-excerpt">{{ featuredArticle.excerpt }}</p>
            <div class="article-footer">
              <div class="author-info">
                <img :src="featuredArticle.author.avatar" :alt="featuredArticle.author.name" class="author-avatar">
                <span class="author-name">{{ featuredArticle.author.name }}</span>
              </div>
              <div class="article-stats">
                <span class="stat">👁️ {{ featuredArticle.views }}</span>
                <span class="stat">💬 {{ featuredArticle.comments }}</span>
                <span class="stat">❤️ {{ featuredArticle.likes }}</span>
              </div>
            </div>
          </div>
        </article>

        <!-- 文章列表 -->
        <div class="articles-grid">
          <article 
            v-for="article in filteredArticles" 
            :key="article.id" 
            class="article-card"
            @click="viewArticle(article.id)"
          >
            <div class="card-image">
              <img :src="article.image" :alt="article.title">
              <div class="card-overlay">
                <button class="read-more-btn">阅读全文</button>
              </div>
            </div>
            <div class="card-content">
              <div class="article-meta">
                <span class="category-tag">{{ article.category }}</span>
                <span class="publish-date">{{ article.date }}</span>
              </div>
              <h3 class="card-title">{{ article.title }}</h3>
              <p class="card-excerpt">{{ article.excerpt }}</p>
              <div class="card-footer">
                <div class="author-info">
                  <img :src="article.author.avatar" :alt="article.author.name" class="author-avatar">
                  <span class="author-name">{{ article.author.name }}</span>
                </div>
                <div class="card-stats">
                  <span class="stat">👁️ {{ article.views }}</span>
                  <span class="stat">💬 {{ article.comments }}</span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>

      <!-- 侧边栏 -->
      <aside class="blog-sidebar">
        <!-- 个人资料卡片 -->
        <div class="profile-card">
          <div class="profile-header">
            <img src="../../assets/images/bloger.webp" alt="博主头像" class="profile-avatar">
            <h3 class="profile-name">Oscar Lin</h3>
            <p class="profile-bio">全栈开发者 / 创作者</p>
          </div>
          <div class="profile-stats">
            <div class="profile-stat">
              <span class="stat-number">2年+</span>
              <span class="stat-label">开发经验</span>
            </div>
            <div class="profile-stat">
              <span class="stat-number">10+</span>
              <span class="stat-label">项目经验</span>
            </div>
          </div>
          <div class="social-links">
            <a href="#" class="social-link">📧</a>
            <a href="#" class="social-link">🐙</a>
            <a href="#" class="social-link">🐦</a>
            <a href="#" class="social-link">💼</a>
          </div>
        </div>

        <!-- 热门标签 -->
        <div class="sidebar-section">
          <h4 class="section-title">热门标签</h4>
          <div class="tags-cloud">
            <span class="tag" v-for="tag in popularTags" :key="tag.name" :style="{ fontSize: tag.size + 'px' }">
              {{ tag.name }}
            </span>
          </div>
        </div>

        <!-- 最新评论 -->
        <div class="sidebar-section">
          <h4 class="section-title">最新评论</h4>
          <div class="comments-list">
            <div class="comment-item" v-for="comment in recentComments" :key="comment.id">
              <img :src="comment.avatar" :alt="comment.author" class="comment-avatar">
              <div class="comment-content">
                <div class="comment-author">{{ comment.author }}</div>
                <div class="comment-text">{{ comment.text }}</div>
                <div class="comment-time">{{ comment.time }}</div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </main>

    <!-- 页脚 -->
    <footer class="blog-footer">
      <div class="footer-content">
        <div class="footer-section">
          <h4>关于博客</h4>
          <p>分享技术见解、生活感悟和创意灵感，记录成长路上的每一个精彩瞬间。</p>
        </div>
        <div class="footer-section">
          <h4>快速链接</h4>
          <ul>
            <li><a href="#">首页</a></li>
            <li><a href="#">文章归档</a></li>
            <li><a href="#">关于我</a></li>
            <li><a href="#">联系方式</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h4>订阅更新</h4>
          <div class="subscribe-form">
            <input type="email" placeholder="输入邮箱地址" class="subscribe-input">
            <button class="subscribe-btn">订阅</button>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2024 Oscar's Blog. 保留所有权利。</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// 响应式数据
const searchQuery = ref('')
const currentCategory = ref('all')

// 特色文章数据
const featuredArticle = ref({
  id: 1,
  title: 'Vue 3 组合式 API 深度解析：从入门到精通',
  excerpt: '深入探讨 Vue 3 组合式 API 的核心概念、最佳实践和高级技巧，帮助你构建更优雅、更可维护的 Vue 应用...',
  image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
  category: '技术',
  date: '2024-01-15',
  views: 2847,
  comments: 89,
  likes: 156,
  author: {
    name: 'Oscar Lin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face'
  }
})

// 文章列表数据
const articles = ref([
  {
    id: 2,
    title: '现代 CSS 布局技巧：Grid vs Flexbox',
    excerpt: '探索 CSS Grid 和 Flexbox 的强大功能，学习如何创建响应式和灵活的网页布局...',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop',
    category: '技术',
    date: '2024-01-12',
    views: 1245,
    comments: 34,
    author: {
      name: 'Oscar Lin',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face'
    }
  },
  {
    id: 3,
    title: '设计师的日常：如何保持创意灵感',
    excerpt: '分享我在设计工作中保持创意灵感的方法和技巧，从日常观察到创意收集...',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
    category: '设计',
    date: '2024-01-10',
    views: 892,
    comments: 23,
    author: {
      name: 'Oscar Lin',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face'
    }
  },
  {
    id: 4,
    title: '远程工作的效率提升指南',
    excerpt: '基于个人经验总结的远程工作技巧，帮助你提高工作效率和生活质量...',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop',
    category: '生活',
    date: '2024-01-08',
    views: 1567,
    comments: 45,
    author: {
      name: 'Oscar Lin',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face'
    }
  },
  {
    id: 5,
    title: 'TypeScript 高级类型系统详解',
    excerpt: '深入理解 TypeScript 的类型系统，掌握高级类型技巧和最佳实践...',
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=250&fit=crop',
    category: '技术',
    date: '2024-01-05',
    views: 2034,
    comments: 67,
    author: {
      name: 'Oscar Lin',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face'
    }
  },
  {
    id: 6,
    title: '创意写作：如何讲好一个故事',
    excerpt: '探讨创意写作的核心要素，从角色塑造到情节设计，帮助你成为更好的故事讲述者...',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=250&fit=crop',
    category: '创意',
    date: '2024-01-03',
    views: 756,
    comments: 28,
    author: {
      name: 'Oscar Lin',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face'
    }
  }
])

// 热门标签数据
const popularTags = ref([
  { name: 'Vue.js', size: 24 },
  { name: 'React', size: 20 },
  { name: 'TypeScript', size: 22 },
  { name: 'CSS', size: 18 },
  { name: 'JavaScript', size: 26 },
  { name: '设计', size: 16 },
  { name: '创意', size: 14 },
  { name: '生活', size: 12 }
])

// 最新评论数据
const recentComments = ref([
  {
    id: 1,
    author: '张三',
    text: '这篇文章写得很好，对我帮助很大！',
    time: '2小时前',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
  },
  {
    id: 2,
    author: '李四',
    text: '期待更多关于Vue3的内容',
    time: '5小时前',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'
  },
  {
    id: 3,
    author: '王五',
    text: '远程工作的建议很实用',
    time: '1天前',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face'
  }
])

// 计算属性
const filteredArticles = computed(() => {
  let filtered = articles.value

  // 按分类筛选
  if (currentCategory.value !== 'all') {
    filtered = filtered.filter(article => {
      const categoryMap: Record<string, string> = {
        tech: '技术',
        life: '生活',
        design: '设计',
        creative: '创意'
      }
      return article.category === categoryMap[currentCategory.value]
    })
  }

  // 按搜索关键词筛选
  if (searchQuery.value) {
    filtered = filtered.filter(article =>
      article.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  return filtered
})

// 方法
const filterCategory = (category: string) => {
  currentCategory.value = category
}

const viewArticle = (id: number) => {
  console.log('查看文章:', id)
  // 这里可以添加路由跳转逻辑
}
</script>

<style scoped>
/* 全局样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.blog-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow-x: hidden;
  font-size: 16px; /* 设置基础字体大小 */
}

/* 背景装饰 */
.background-decoration {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.floating-shape {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  animation: float 6s ease-in-out infinite;
}

.shape-1 {
  width: 200px;
  height: 200px;
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.shape-2 {
  width: 150px;
  height: 150px;
  top: 60%;
  right: 15%;
  animation-delay: 2s;
}

.shape-3 {
  width: 100px;
  height: 100px;
  bottom: 20%;
  left: 20%;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

/* 头部样式 */
.blog-header {
  padding: 60px 20px 40px;
  text-align: center;
  position: relative;
  z-index: 1;
}

.header-content {
  width: 100%; /* 移除max-width限制 */
  margin: 0 auto;
}

.blog-title {
  margin-bottom: 20px;
  font-size: 2.5rem; /* 减小标题字体大小 */
  font-weight: 700;
  line-height: 1.2;
}

.title-gradient {
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientShift 3s ease-in-out infinite;
}

.title-subtitle {
  color: rgba(255, 255, 255, 0.9);
  font-weight: 300;
  margin-left: 10px;
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.blog-description {
  font-size: 1rem; /* 减小描述字体大小 */
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 30px;
  font-weight: 300;
}

.header-stats {
  display: flex;
  justify-content: center;
  gap: 30px;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 1.5rem; /* 减小数字字体大小 */
  font-weight: 700;
  color: #fff;
  margin-bottom: 5px;
}

.stat-label {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.8rem;
}

/* 导航栏样式 */
.blog-nav {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 15px;
  margin: 0 20px 30px;
  padding: 15px;
  position: relative;
  z-index: 1;
}

.nav-container {
  width: 100%; /* 移除max-width限制 */
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
}

.nav-categories {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.nav-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  font-size: 0.9rem;
}

.nav-btn:hover,
.nav-btn.active {
  background: rgba(255, 255, 255, 0.3);
  color: #fff;
  transform: translateY(-2px);
}

.search-box {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 4px;
}

.search-input {
  border: none;
  background: transparent;
  padding: 8px 12px;
  color: #fff;
  outline: none;
  width: 180px;
  font-size: 0.9rem;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.search-btn {
  border: none;
  background: rgba(255, 255, 255, 0.3);
  color: #fff;
  padding: 8px 12px;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.search-btn:hover {
  background: rgba(255, 255, 255, 0.4);
}

/* 主要内容区域 */
.blog-main {
  width: 100%; /* 移除max-width限制，使用全屏宽度 */
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: 1fr 320px; /* 减小侧边栏宽度 */
  gap: 30px;
  position: relative;
  z-index: 1;
}

.content-grid {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

/* 特色文章样式 */
.featured-article {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 15px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
}

.featured-article:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.featured-image {
  position: relative;
  height: 250px; /* 减小图片高度 */
  overflow: hidden;
}

.featured-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.featured-article:hover .featured-image img {
  transform: scale(1.05);
}

.featured-overlay {
  position: absolute;
  top: 15px;
  left: 15px;
}

.featured-badge {
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  color: #fff;
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 0.75rem;
  font-weight: 600;
}

.featured-content {
  padding: 25px;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.category-tag {
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

.publish-date {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.8rem;
}

.article-title {
  font-size: 1.5rem; /* 减小标题字体大小 */
  color: #fff;
  margin-bottom: 12px;
  line-height: 1.3;
}

.article-excerpt {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.5;
  margin-bottom: 18px;
  font-size: 0.9rem;
}

.article-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.author-avatar {
  width: 35px; /* 减小头像大小 */
  height: 35px;
  border-radius: 50%;
  object-fit: cover;
}

.author-name {
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  font-size: 0.9rem;
}

.article-stats {
  display: flex;
  gap: 12px;
}

.stat {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.8rem;
}

/* 文章网格样式 */
.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); /* 增加最小宽度，让文章卡片更大 */
  gap: 25px;
}

.article-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 15px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
}

.article-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.card-image {
  position: relative;
  height: 200px; /* 增加图片高度 */
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.article-card:hover .card-image img {
  transform: scale(1.05);
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.article-card:hover .card-overlay {
  opacity: 1;
}

.read-more-btn {
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.85rem;
}

.read-more-btn:hover {
  background: #fff;
  transform: scale(1.05);
}

.card-content {
  padding: 20px; /* 增加内边距 */
}

.card-title {
  font-size: 1.2rem; /* 增加标题字体大小 */
  color: #fff;
  margin-bottom: 10px;
  line-height: 1.4;
}

.card-excerpt {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.5;
  margin-bottom: 15px;
  font-size: 0.9rem; /* 增加描述字体大小 */
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-stats {
  display: flex;
  gap: 10px;
}

/* 侧边栏样式 */
.blog-sidebar {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.profile-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 15px;
  padding: 25px;
  text-align: center;
}

.profile-header {
  margin-bottom: 20px;
}

.profile-avatar {
  width: 70px; /* 减小头像大小 */
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 12px;
  border: 3px solid rgba(255, 255, 255, 0.3);
}

.profile-name {
  color: #fff;
  font-size: 1.1rem; /* 减小名字字体大小 */
  font-weight: 600;
  margin-bottom: 6px;
}

.profile-bio {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.85rem;
  line-height: 1.4;
}

.profile-stats {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.profile-stat {
  text-align: center;
}

.profile-stat .stat-number {
  display: block;
  color: #fff;
  font-size: 1rem; /* 减小数字字体大小 */
  font-weight: 700;
  margin-bottom: 4px;
}

.profile-stat .stat-label {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.75rem;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 12px;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px; /* 减小社交链接大小 */
  height: 35px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  color: #fff;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.social-link:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.sidebar-section {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 15px;
  padding: 20px;
}

.section-title {
  color: #fff;
  font-size: 1rem; /* 减小标题字体大小 */
  font-weight: 600;
  margin-bottom: 15px;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 0;
  width: 25px;
  height: 2px;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  border-radius: 1px;
}

.tags-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  padding: 5px 10px;
  border-radius: 12px;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tag:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.comment-item {
  display: flex;
  gap: 10px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.comment-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.comment-avatar {
  width: 30px; /* 减小评论头像大小 */
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.comment-content {
  flex: 1;
}

.comment-author {
  color: #fff;
  font-weight: 600;
  font-size: 0.8rem;
  margin-bottom: 4px;
}

.comment-text {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.8rem;
  line-height: 1.4;
  margin-bottom: 4px;
}

.comment-time {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.7rem;
}

/* 页脚样式 */
.blog-footer {
  margin-top: 60px;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(20px);
  border-radius: 15px 15px 0 0;
  padding: 40px 20px 15px;
  position: relative;
  z-index: 1;
}

.footer-content {
  width: 100%; /* 移除max-width限制，使用全屏宽度 */
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* 减小最小宽度 */
  gap: 30px;
}

.footer-section h4 {
  color: #fff;
  font-size: 1rem; /* 减小标题字体大小 */
  font-weight: 600;
  margin-bottom: 15px;
}

.footer-section p {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.5;
  font-size: 0.85rem;
}

.footer-section ul {
  list-style: none;
}

.footer-section ul li {
  margin-bottom: 8px;
}

.footer-section ul li a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: 0.85rem;
}

.footer-section ul li a:hover {
  color: #fff;
}

.subscribe-form {
  display: flex;
  gap: 8px;
}

.subscribe-input {
  flex: 1;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  padding: 10px 12px;
  border-radius: 20px;
  outline: none;
  font-size: 0.85rem;
}

.subscribe-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.subscribe-btn {
  border: none;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  color: #fff;
  padding: 10px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  font-size: 0.85rem;
}

.subscribe-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.footer-bottom {
  text-align: center;
  margin-top: 30px;
  padding-top: 15px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-bottom p {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.8rem;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .blog-main {
    grid-template-columns: 1fr;
    gap: 25px;
  }
  
  .blog-sidebar {
    order: -1;
  }
  
  .articles-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
}

@media (max-width: 768px) {
  .blog-main {
    padding: 0 15px;
  }
  
  .blog-title {
    font-size: 2rem;
  }
  
  .header-stats {
    gap: 15px;
  }
  
  .nav-container {
    flex-direction: column;
    align-items: stretch;
  }
  
  .nav-categories {
    justify-content: center;
  }
  
  .search-box {
    justify-content: center;
  }
  
  .search-input {
    width: 100%;
    max-width: 250px;
  }
  
  .articles-grid {
    grid-template-columns: 1fr;
  }
  
  .featured-content {
    padding: 18px;
  }
  
  .article-title {
    font-size: 1.3rem;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    gap: 25px;
  }
}

@media (max-width: 480px) {
  .blog-header {
    padding: 40px 15px 30px;
  }
  
  .blog-title {
    font-size: 1.8rem;
  }
  
  .header-stats {
    flex-direction: column;
    gap: 12px;
  }
  
  .blog-nav {
    margin: 0 15px 25px;
    padding: 12px;
  }
  
  .nav-categories {
    gap: 6px;
  }
  
  .nav-btn {
    padding: 6px 12px;
    font-size: 0.8rem;
  }
  
  .blog-main {
    padding: 0 15px;
  }
  
  .featured-image {
    height: 180px;
  }
  
  .featured-content {
    padding: 12px;
  }
  
  .article-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .profile-card,
  .sidebar-section {
    padding: 15px;
  }
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

/* 加载动画 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.article-card,
.featured-article,
.profile-card,
.sidebar-section {
  animation: fadeInUp 0.6s ease-out;
}

/* 悬停效果增强 */
.article-card:hover .card-image::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(255, 107, 107, 0.3), rgba(78, 205, 196, 0.3));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.article-card:hover .card-image::after {
  opacity: 1;
}

/* 按钮点击效果 */
.nav-btn:active,
.search-btn:active,
.read-more-btn:active,
.subscribe-btn:active {
  transform: scale(0.95);
}

/* 文字选择样式 */
::selection {
  background: rgba(255, 107, 107, 0.3);
  color: #fff;
}

::-moz-selection {
  background: rgba(255, 107, 107, 0.3);
  color: #fff;
}
</style>