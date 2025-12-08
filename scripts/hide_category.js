// scripts/hide_category.js
hexo.extend.generator.register('index', function(locals){
  const pagination = hexo.config.index_generator.per_page;
  
  // 1. 直接获取所有文章（Hexo默认已经是按时间排好的）
  // 我们只做过滤，不乱动排序，这样绝对不会报错
  var allPosts = locals.posts;

  // 2. 过滤掉“灵异”文章
  var filteredPosts = allPosts.filter(function(post){
      let isMystery = false;
      
      // 安全检查：防止文章没有分类导致报错
      if (post.categories && post.categories.length) {
          // 兼容写法：不管它是数组还是对象，都用 forEach
          post.categories.forEach(function(cat){
              if (cat.name === '灵异现象研究') isMystery = true;
          });
      }
      
      // 如果是灵异文章，就不显示(return false)
      return !isMystery;
  });

  // 3. 构造分页数据
  return {
    path: '',
    layout: ['index', 'archive'],
    data: {
      __index: true,
      posts: filteredPosts.slice(0, pagination),
      prev: 0,
      next: filteredPosts.length > pagination ? 2 : 0,
      current: 1,
      total: Math.ceil(filteredPosts.length / pagination)
    }
  };
});