hexo.extend.injector.register('body_end', function() {
  return `
  <script>
  (function() {
    // === 核心逻辑：判断当前页面并切换模式 ===
    function toggleMysteryMode() {
      var isMystery = false;
      var path = decodeURIComponent(window.location.pathname);

      // 1. 检查 URL (最强检测，覆盖文章页和分类页)
      // 只要链接里带 'mystery' 或 '灵异'，统统变身
      if (path.indexOf('mystery') !== -1 || path.indexOf('灵异') !== -1) {
        isMystery = true;
      }
      
      // 2. 补漏：检查页面内的标签 (防止 URL 没中文的情况)
      if (!isMystery) {
        // 检查文章分类标签
        var cats = document.querySelectorAll('.post-category a, .post-meta-item-category a');
        for (var i = 0; i < cats.length; i++) {
          if (cats[i].innerText.trim() === '灵异现象研究') {
             isMystery = true; break;
          }
        }
        // 检查分类列表页的大标题
        var pageTitle = document.querySelector('.collection-header');
        if (pageTitle && pageTitle.innerText.indexOf('灵异') !== -1) {
           isMystery = true;
        }
      }

      // === 执行变身或复原 ===
      var body = document.body;
      var bannerClass = 'paranormal-banner-global';
      var existingBanner = document.querySelector('.' + bannerClass);

      if (isMystery) {
        // [变身]：如果没有类名就加上
        if (!body.classList.contains('mystery-mode')) {
           body.classList.add('mystery-mode');
        }
        // [眼睛]：如果没有 Banner 就造一个
        if (!existingBanner) {
           createBanner();
        }
      } else {
        // [复原]：离开灵异区，自动变回正常 (如果你想保持黑色，把下面这几行删掉即可)
        if (body.classList.contains('mystery-mode')) {
           body.classList.remove('mystery-mode');
        }
        if (existingBanner) {
           existingBanner.remove();
        }
      }
    }

    // === 造眼睛的函数 (复用) ===
    function createBanner() {
      var bannerContainer = document.createElement('div');
      bannerContainer.className = 'paranormal-banner-global';
      var imageUrl = 'https://em-content.zobj.net/source/apple/391/eye_1f441-fe0f.png'; 
      var rows = 4; var cols = 12; var bannerHTML = '';

      for (var r = 0; r < rows; r++) {
        for (var c = 0; c < cols; c++) {
          var baseTop = (r / rows) * 100;
          var baseLeft = (c / cols) * 100;
          var top = (baseTop + Math.random() * (100 / rows) - 2).toFixed(2) + '%';
          var left = (baseLeft + Math.random() * (100 / cols) - 2).toFixed(2) + '%';
          var rot = Math.floor(Math.random() * 360) + 'deg'; 
          var sz = (Math.random() * 0.8 + 0.6).toFixed(2); 
          var dur = (Math.random() * 4 + 3).toFixed(1) + 's';
          var delay = (Math.random() * -5).toFixed(1) + 's';
          var opacity = (Math.random() * 0.4 + 0.5).toFixed(2);
          bannerHTML += '<img src="' + imageUrl + '" class="mystery-eye-icon" style="--top:' + top + '; --left:' + left + '; --rot:' + rot + '; --sz:' + sz + '; --dur:' + dur + '; --delay:' + delay + '; --op:' + opacity + ';">';
        }
      }
      bannerContainer.innerHTML = bannerHTML;
      document.body.insertBefore(bannerContainer, document.body.firstChild);
    }

    // === 关键修改：监听 PJAX 跳转事件 ===
    // 1. 第一次打开网页时运行
    toggleMysteryMode();
    
    // 2. 每次点击跳转成功后，重新运行检测
    document.addEventListener('pjax:success', function() {
      toggleMysteryMode();
    });
  })();
  </script>
  `;
});