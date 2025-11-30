$(document).ready(function () {
  var $sidebar = $('.app-sidebar'),
    $sidebar_content = $('.sidebar-content'),
    $sidebar_img = $sidebar.data('image'),
    $sidebar_img_container = $('.sidebar-background'),
    $wrapper = $('.wrapper');
  $sidebar_content.perfectScrollbar();

  if ($sidebar_img_container.length !== 0 && $sidebar_img !== undefined) $sidebar_img_container.css('background-image', 'url("' + $sidebar_img + '")');

  if (!$wrapper.hasClass('nav-collapsed')) $sidebar_content.find('li.active').parents('li').addClass('open');

  $sidebar_content.on('click', '.navigation li a', function (e) {
    if (e) if (e.target.innerHTML.includes('مشاهده گزارش')) return
    var $this = $(this),
    listItem = $this.parent('li');
    
    if (listItem.hasClass('has-sub') && listItem.hasClass('open')) {
      collapse(listItem);
    } else {
      if (listItem.hasClass('has-sub')) {
        expand(listItem);
      }
      // If menu accordion then close all except clicked once
      else {
        openListItems = listItem.siblings('.open');
        collapse(openListItems);
        listItem.siblings('.open').find('li.open').removeClass('open');
      }
    }
  });

  function collapse($listItem) {
    var $subList = $listItem.children('ul');
    $subList.show().slideUp(200, function () {
      $(this).css('display', '');
      $listItem.removeClass('open');
    });
  }

  function expand($listItem) {
    var $subList = $listItem.children('ul');
    $listItem.addClass('open');
    $subList.hide().slideDown(200, function () {
      $(this).css('display', '');
    });
  }

  $('.nav-toggle').on('click', function () {
    var $this = $(this),
      toggle_icon = $this.find('.toggle-icon'),
      toggle = toggle_icon.attr('data-toggle');

    if (toggle === 'expanded') {
      $wrapper.addClass('nav-collapsed');

      $('.nav-toggle').find('.toggle-icon').removeClass('fa-toggle-on').addClass('fa-toggle-off');
      toggle_icon.attr('data-toggle', 'collapsed');
    }
    else {
      $wrapper.removeClass('nav-collapsed menu-collapsed');
      $('.nav-toggle').find('.toggle-icon').removeClass('fa-toggle-off').addClass('fa-toggle-on');
      toggle_icon.attr('data-toggle', 'expanded');
    }
  });

  $sidebar.on('mouseenter', function () {
    if ($wrapper.hasClass('nav-collapsed')) {
      $wrapper.removeClass('menu-collapsed');
      var $listItem = $('.navigation li.nav-collapsed-open'),
        $subList = $listItem.children('ul');
      $subList.hide().slideDown(300, function () {
        $(this).css('display', '');
      })
      $listItem.addClass('open').removeClass('nav-collapsed-open');
    }
  }).on('mouseleave', function (event) {
    if ($wrapper.hasClass('nav-collapsed')) {
      $wrapper.addClass('menu-collapsed');
      var $listItem = $('.navigation li.open'),
        $subList = $listItem.children('ul');
      $listItem.addClass('nav-collapsed-open');

      $subList.show().slideUp(300, function () {
        $(this).css('display', '');
      });
      $listItem.removeClass('open');
    }
  });

  if ($(window).width() < 992) {
    $sidebar.addClass('hide-sidebar');
    $wrapper.removeClass('nav-collapsed menu-collapsed');
  }
  $(window).resize(function () {
    if ($(window).width() < 992) {
      $sidebar.addClass('hide-sidebar');
      $wrapper.removeClass('nav-collapsed menu-collapsed');
    }
    if ($(window).width() > 992) {
      $sidebar.removeClass('hide-sidebar');
      if ($('.toggle-icon').attr('data-toggle') === 'collapsed' && $wrapper.not('.nav-collapsed menu-collapsed')) $wrapper.addClass('nav-collapsed menu-collapsed');
    }
  });

  $(document).on('click', '.navigation li:not(.has-sub)', function (e) {
    if (e) if (e.target.innerHTML.includes('مشاهده گزارش')) return
    if ($(window).width() < 992) {
      $sidebar.addClass('hide-sidebar');
    }
  });

  $('.navbar-toggle').on('click', function (e) {
    e.stopPropagation();
    $sidebar.toggleClass('hide-sidebar');
  });

  $('html').on('click', function (e) {
    if (e) if (e.target.className.includes('fa-arrow-circle-right')) return
    if ($(window).width() < 992) {
      if (!$sidebar.hasClass('hide-sidebar') && $sidebar.has(e.target).length === 0) {
        $sidebar.addClass('hide-sidebar');
      }
    }
  });

  $('#sidebarClose').on('click', function () {
    $sidebar.addClass('hide-sidebar');
  });
});
