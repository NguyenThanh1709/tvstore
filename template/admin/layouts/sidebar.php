<?php
$userID = isLogin()['user_id'];
$userDetail = userDetail($userID);

//Check quyền
$groupID = getGroupID();
$permissionData = getPermissionData($groupID);

?>
<!-- Main Sidebar Container -->
<aside class="main-sidebar sidebar-dark-primary elevation-4">
  <!-- Brand Logo -->
  <a href="<?php echo _WEB_HOST_ROOT_ADMIN ?>" class="brand-link text-center">
    <!-- <img src="<?php echo _WEB_HOST_TEMPLATE_ADMIN ?>/assets/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8"> -->
    <span class="brand-text font-weight-bold"><?php echo "ADMIN " . _NAME_PROJECT ?></span>
  </a>
  <!-- Sidebar -->
  <div class="sidebar">
    <!-- Sidebar user panel (optional) -->
    <div class="user-panel mt-3 pb-3 mb-3 d-flex">
      <div class="image">
        <img src="<?php echo _WEB_HOST_TEMPLATE_ADMIN ?>/assets/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image">
      </div>
      <div class="info">
        <a href="<?php echo getLinkAdmin('users', 'profile') ?>" class="d-block"><?php echo $userDetail['fullname'] ?></a>
      </div>
    </div>
    <!-- Sidebar Menu -->
    <nav class="mt-2">
      <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
        <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
        <li class="nav-item">
          <a href="<?php echo _WEB_HOST_ROOT_ADMIN ?>" class="nav-link <?php echo activeMenuSidebar('dashboarh') ? 'active' : false; ?>">
            <i class="nav-icon fas fa-tachometer-alt"></i>
            <p>
              Bảng điều khiển
            </p>
          </a>
        </li>

        <!-- Blog -->
        <?php if (checkPermission($permissionData, 'blogs', 'list', 'list')) : ?>
          <li class="nav-item has-treeview <?php echo activeMenuSidebar('blogs') ? 'menu-open' : false; ?><?php echo activeMenuSidebar('blog_categories') ? 'menu-open' : false; ?>">
            <a href="<?php echo getLinkAdmin('blogs') ?>" class="nav-link <?php echo activeMenuSidebar('blogs') ? 'active' : false; ?> <?php echo activeMenuSidebar('blog_categories') ? 'active' : false; ?>">
              <i class="nav-icon fas fa-blog"></i>
              <p>
                Bài viết
                <i class="fas fa-angle-left right"></i>
                <!-- <span class="badge badge-info right">6</span> -->
              </p>
            </a>
            <ul class="nav nav-treeview">
              <?php if (checkPermission($permissionData, 'blogs', 'add', 'add')) : ?>
                <li class="nav-item">
                  <a href="<?php echo getLinkAdmin('blogs', 'add') ?>" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Thêm mới</p>
                  </a>
                </li>
              <?php endif; ?>
              <?php if (checkPermission($permissionData, 'blogs', 'list', 'list')) : ?>
                <li class="nav-item">
                  <a href="<?php echo getLinkAdmin('blogs', 'list') ?>" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Danh sách</p>
                  </a>
                </li>
              <?php endif; ?>
              <?php if (checkPermission($permissionData, 'blog_categories', 'list', 'list')) : ?>
                <li class="nav-item">
                  <a href="<?php echo getLinkAdmin('blog_categories', 'list') ?>" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Danh mục</p>
                  </a>
                </li>
              <?php endif; ?>
            </ul>
          </li>
        <?php endif; ?>
        <!-- End - blog -->

        <!-- Contacts -->
        <?php if (checkPermission($permissionData, 'contacts', 'list', 'list')) : ?>
          <li class="nav-item has-treeview <?php echo activeMenuSidebar('contacts') ? 'menu-open' : false; ?>">
            <a href="<?php echo getLinkAdmin('contacts') ?>" class="nav-link <?php echo activeMenuSidebar('contacts') ? 'active' : false; ?>">
              <i class="nav-icon fa fa-phone"></i>
              <p>
                Liên hệ
                <i class="fas fa-angle-left right"></i>
                <span class="badge badge-danger right" title="Liên hệ mới"><?php echo getCountContact(0) ?></span>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <a href="<?php echo getLinkAdmin('contacts') ?>" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Danh sách</p>
                </a>
              </li>
            </ul>
          </li>
        <?php endif ?>
        <!-- End contact -->


        <!-- Comments -->
        <?php if (checkPermission($permissionData, 'comments', 'list', 'list')) : ?>
          <li class="nav-item has-treeview <?php echo activeMenuSidebar('comments') ? 'menu-open' : false; ?>">
            <a href="<?php echo getLinkAdmin('comments') ?>" class="nav-link <?php echo activeMenuSidebar('comments') ? 'active' : false; ?>">
              <i class="nav-icon fas fa-users"></i>
              <p>
                Quản lý bình luận
                <i class="fas fa-angle-left right"></i>
                <span class="number-status-comment badge badge-danger right"><?php echo getCommentCountStatus(); ?></span>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <a href="<?php echo getLinkAdmin('comments') ?>" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Danh sách</p>
                </a>
              </li>
            </ul>
          </li>
        <?php endif; ?>
        <!-- End Comment -->


        <!-- Register -->
        <?php if (checkPermission($permissionData, 'subscribes', 'list', 'list')) : ?>
          <li class="nav-item has-treeview <?php echo activeMenuSidebar('subscribes') ? 'menu-open' : false; ?>">
            <a href="<?php echo getLinkAdmin('subscribes') ?>" class="nav-link <?php echo activeMenuSidebar('subscribes') ? 'active' : false; ?>">
              <i class="nav-icon fa fa-registered"></i>
              <p>
                Đăng ký
                <i class="fas fa-angle-left right"></i>
                <span class="mr-3 badge badge-warning right"><?php echo getSubscribeCountStatus(1) ?></span>
                <span class="mr-3 badge badge-danger right"><?php echo getSubscribeCountStatus(0) ?></span>

              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <a href="<?php echo getLinkAdmin('subscribes') ?>" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Danh sách</p>
                </a>
              </li>
            </ul>
          </li>
        <?php endif; ?>
        <!-- End Register -->

        <!-- Portfolio - categories -->
        <?php if (checkPermission($permissionData, 'portfolios', 'list', 'list')) : ?>
          <li class="nav-item has-treeview <?php echo activeMenuSidebar('portfolio_categories') ? 'menu-open' : false; ?><?php echo activeMenuSidebar('portfolios') ? 'menu-open' : false; ?>">
            <a href="<?php echo getLinkAdmin('portfolio_categories') ?>" class="nav-link <?php echo activeMenuSidebar('portfolio_categories') ? 'active' : false; ?><?php echo activeMenuSidebar('portfolios') ? 'active' : false; ?>">
              <i class="nav-icon fas fa-book"></i>
              <p>
                Quản lý dự án
                <i class="fas fa-angle-left right"></i>
                <!-- <span class="badge badge-info right">6</span> -->
              </p>
            </a>
            <ul class="nav nav-treeview">
              <?php if (checkPermission($permissionData, 'portfolios', 'add', 'add')) : ?>
                <li class="nav-item">
                  <a href="<?php echo getLinkAdmin('portfolios', 'add') ?>" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Thêm mới dự án</p>
                  </a>
                </li>
              <?php
              endif;
              if (checkPermission($permissionData, 'portfolios', 'list', 'list')) :
              ?>
                <li class="nav-item">
                  <a href="<?php echo getLinkAdmin('portfolios') ?>" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Danh sách dự án</p>
                  </a>
                </li>
              <?php
              endif;
              if (checkPermission($permissionData, 'portfolio_categories', 'list', 'list')) :
              ?>
                <li class="nav-item">
                  <a href="<?php echo getLinkAdmin('portfolio_categories') ?>" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Danh sách danh mục</p>
                  </a>
                </li>
              <?php endif; ?>
            </ul>
          </li>
        <?php endif; ?>
        <!-- End Portfolio -- categories -->

        <!-- Services -->
        <?php if (checkPermission($permissionData, 'services', 'list', 'list')) : ?>
          <li class="nav-item has-treeview <?php echo activeMenuSidebar('services') ? 'menu-open' : false; ?>">
            <a href="<?php echo getLinkAdmin('services') ?>" class="nav-link <?php echo activeMenuSidebar('services') ? 'active' : false; ?>">
              <i class="nav-icon fab fa-servicestack"></i>
              <p>
                Dịch vụ
                <i class="fas fa-angle-left right"></i>
                <!-- <span class="badge badge-info right">6</span> -->
              </p>
            </a>
            <ul class="nav nav-treeview">
              <?php if (checkPermission($permissionData, 'services', 'add', 'add')) : ?>
                <li class="nav-item">
                  <a href="<?php echo getLinkAdmin('services', 'add') ?>" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Thêm mới</p>
                  </a>
                </li>
              <?php endif; ?>
              <li class="nav-item">
                <a href="<?php echo getLinkAdmin('services') ?>" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Danh sách</p>
                </a>
              </li>
            </ul>
          </li>
        <?php endif; ?>
        <!-- End services -->

        <!-- pages -->
        <?php if (checkPermission($permissionData, 'pages', 'list', 'list')) : ?>
          <li class="nav-item has-treeview <?php echo activeMenuSidebar('pages') ? 'menu-open' : false; ?>">
            <a href="<?php echo getLinkAdmin('pages') ?>" class="nav-link <?php echo activeMenuSidebar('pages') ? 'active' : false; ?>">
              <i class="nav-icon fa fa-file"></i>
              <p>
                Trang
                <i class="fas fa-angle-left right"></i>
                <!-- <span class="badge badge-info right">6</span> -->
              </p>
            </a>
            <ul class="nav nav-treeview">
              <?php if (checkPermission($permissionData, 'pages', 'add', 'add')) : ?>
                <li class="nav-item">
                  <a href="<?php echo getLinkAdmin('pages', 'add') ?>" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Thêm mới</p>
                  </a>
                </li>
              <?php endif; ?>
              <li class="nav-item">
                <a href="<?php echo getLinkAdmin('pages') ?>" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Danh sách</p>
                </a>
              </li>
            </ul>
          </li>
        <?php endif ?>
        <!-- End pages -->

        <!-- groups users -->
        <?php if (checkPermission($permissionData, 'groups', 'list', 'list')) : ?>
          <li class="nav-item has-treeview <?php echo activeMenuSidebar('groups') ? 'menu-open' : false; ?>">
            <a href="<?php echo getLinkAdmin('groups') ?>" class="nav-link <?php echo activeMenuSidebar('groups') ? 'active' : false; ?>">
              <i class="nav-icon fas fa-users"></i>
              <p>
                Nhóm người dùng
                <i class="fas fa-angle-left right"></i>
                <!-- <span class="badge badge-info right">6</span> -->
              </p>
            </a>
            <ul class="nav nav-treeview">
              <?php if (checkPermission($permissionData, 'groups', 'add', 'add')) : ?>
                <li class="nav-item">
                  <a href="<?php echo getLinkAdmin('groups', 'add') ?>" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Thêm mới</p>
                  </a>
                </li>
              <?php endif; ?>
              <li class="nav-item">
                <a href="<?php echo getLinkAdmin('groups') ?>" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Danh sách</p>
                </a>
              </li>
            </ul>
          </li>
        <?php endif; ?>
        <!-- End group users -->

        <!-- Users -->
        <?php if (checkPermission($permissionData, 'users', 'list', 'list')) : ?>
          <li class="nav-item has-treeview <?php echo activeMenuSidebar('users') ? 'menu-open' : false; ?>">
            <a href="<?php echo getLinkAdmin('users') ?>" class="nav-link <?php echo activeMenuSidebar('users') ? 'active' : false; ?>">
              <i class="nav-icon fas fa-user"></i>
              <p>
                Người dùng
                <i class="fas fa-angle-left right"></i>
                <!-- <span class="badge badge-info right">6</span> -->
              </p>
            </a>
            <ul class="nav nav-treeview">
              <?php if (checkPermission($permissionData, 'users', 'add', 'add')) : ?>
                <li class="nav-item">
                  <a href="<?php echo getLinkAdmin('users', 'add') ?>" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Thêm mới</p>
                  </a>
                </li>
              <?php endif; ?>
              <li class="nav-item">
                <a href="<?php echo getLinkAdmin('users') ?>" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Danh sách</p>
                </a>
              </li>
            </ul>
          </li>
        <?php endif; ?>
        <!-- End users -->

        <!-- Seting -->
        <li class="nav-item has-treeview <?php echo activeMenuSidebar('options') ? 'menu-open' : false; ?>">
          <a href="<?php echo getLinkAdmin('options') ?>" class="nav-link <?php echo activeMenuSidebar('options') ? 'active' : false; ?>">
            <i class="nav-icon fa fa-cog"></i>
            <p>
              Thiết lập
              <i class="fas fa-angle-left right"></i>
              <!-- <span class="badge badge-info right">6</span> -->
            </p>
          </a>
          <ul class="nav nav-treeview">
            <?php if (checkPermission($permissionData, 'options', 'genergal', 'genergal')) : ?>
              <li class="nav-item">
                <a href="<?php echo getLinkAdmin('options', 'genergal') ?>" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Thiết lập chung</p>
                </a>
              </li>
            <?php endif; ?>
            <?php if (checkPermission($permissionData, 'options', 'header', 'header')) : ?>
              <li class="nav-item">
                <a href="<?php echo getLinkAdmin('options', 'header') ?>" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Thiết lập Header</p>
                </a>
              </li>
            <?php endif; ?>
            <?php if (checkPermission($permissionData, 'options', 'menu', 'menu')) : ?>
              <li class="nav-item">
                <a href="<?php echo getLinkAdmin('options', 'menu') ?>" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Thiết lập Menu</p>
                </a>
              </li>
            <?php endif; ?>
            <?php if (checkPermission($permissionData, 'options', 'footer', 'footer')) : ?>
              <li class="nav-item">
                <a href="<?php echo getLinkAdmin('options', 'footer') ?>" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Thiết lập Footer</p>
                </a>
              </li>
            <?php endif; ?>
            <?php if (checkPermission($permissionData, 'options', 'home', 'home')) : ?>
              <li class="nav-item">
                <a href="<?php echo getLinkAdmin('options', 'home') ?>" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Thiết lập trang chủ</p>
                </a>
              </li>
            <?php endif; ?>
            <?php if (checkPermission($permissionData, 'options', 'about', 'about')) : ?>
              <li class="nav-item">
                <a href="<?php echo getLinkAdmin('options', 'about') ?>" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Thiết lập trang giới thiệu</p>
                </a>
              </li>
            <?php endif; ?>
            <?php if (checkPermission($permissionData, 'options', 'team', 'team')) : ?>
              <li class="nav-item">
                <a href="<?php echo getLinkAdmin('options', 'team') ?>" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Thiết lập trang team</p>
                </a>
              </li>
            <?php endif; ?>
            <?php if (checkPermission($permissionData, 'options', 'services', 'services')) : ?>
              <li class="nav-item">
                <a href="<?php echo getLinkAdmin('options', 'services') ?>" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Thiết lập trang dịch vụ</p>
                </a>
              </li>
            <?php endif; ?>
            <?php if (checkPermission($permissionData, 'options', 'portfilio', 'portfilio')) : ?>
              <li class="nav-item">
                <a href="<?php echo getLinkAdmin('options', 'portfolio') ?>" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Thiết lập trang dự án</p>
                </a>
              </li>
            <?php endif; ?>
            <?php if (checkPermission($permissionData, 'options', 'blogs', 'blogs')) : ?>
              <li class="nav-item">
                <a href="<?php echo getLinkAdmin('options', 'blogs') ?>" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Thiết lập trang bài viết</p>
                </a>
              </li>
            <?php endif; ?>
            <?php if (checkPermission($permissionData, 'options', 'contact', 'contact')) : ?>
              <li class="nav-item">
                <a href="<?php echo getLinkAdmin('options', 'contact') ?>" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Thiết lập trang liên hệ</p>
                </a>
              </li>
            <?php endif; ?>
          </ul>
        </li>
        <!-- end setting -->
      </ul>
    </nav>
    <!-- /.sidebar-menu -->
  </div>
  <!-- /.sidebar -->
</aside>

<div class="content-wrapper">