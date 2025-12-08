hexo.extend.injector.register('body_end', function() {
  return `
  <script>
  (function() {
    // === 1. 判定逻辑：检测 URL 或 分类 ===
    function checkMystery() {
      // 检查 URL 路径是否包含 mystery 或 灵异
      if (decodeURIComponent(window.location.pathname).indexOf('mystery') !== -1) return true;
      if (decodeURIComponent(window.location.pathname).indexOf('灵异') !== -1) return true;
      
      // 检查页面的分类标签
      var cats = document.querySelectorAll('.post-category a, .post-meta-item-category a');
      for (var i = 0; i < cats.length; i++) {
        if (cats[i].innerText.trim() === '灵异现象研究') return true;
      }
      return false;
    }

    // === 2. 执行逻辑 ===
    if (checkMystery()) {
      // 添加灵异模式类名
      document.body.classList.add('mystery-mode');

      // 创建 Banner 容器
      var bannerContainer = document.createElement('div');
      bannerContainer.className = 'paranormal-banner-global';
      
      var bannerHTML = '';
      // 使用高清 Apple Emoji 在线链接
      var imageUrl = 'https://em-content.zobj.net/source/apple/391/eye_1f441-fe0f.png'; 

      // === 3. 网格抖动分布算法 (均匀但无序) ===
      // 将区域划分为 4行 x 12列 (共48只眼睛)
      var rows = 4;
      var cols = 12;

      for (var r = 0; r < rows; r++) {
        for (var c = 0; c < cols; c++) {
          
          // 计算基准网格位置
          var baseTop = (r / rows) * 100;
          var baseLeft = (c / cols) * 100;

          // 加入随机抖动 (Jitter)
          // 在基准位置上随机偏移 -2% 到 +6%，打破对齐感
          var top = (baseTop + Math.random() * (100 / rows) - 2).toFixed(2) + '%';
          var left = (baseLeft + Math.random() * (100 / cols) - 2).toFixed(2) + '%';

          // 随机属性
          var rot = Math.floor(Math.random() * 360) + 'deg'; // 旋转
          var sz = (Math.random() * 0.8 + 0.6).toFixed(2);    // 大小倍率 (0.6 - 1.4)
          var dur = (Math.random() * 4 + 3).toFixed(1) + 's'; // 漂浮周期
          var delay = (Math.random() * -5).toFixed(1) + 's';  // 动画延迟
          var opacity = (Math.random() * 0.4 + 0.5).toFixed(2); // 透明度

          // 生成 img 标签
          bannerHTML += '<img src="' + imageUrl + '" class="mystery-eye-icon" style="--top:' + top + '; --left:' + left + '; --rot:' + rot + '; --sz:' + sz + '; --dur:' + dur + '; --delay:' + delay + '; --op:' + opacity + ';">';
        }
      }

      bannerContainer.innerHTML = bannerHTML;
      document.body.insertBefore(bannerContainer, document.body.firstChild);
    }
  })();
  </script>
  `;
});