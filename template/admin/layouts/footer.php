</div>
<!-- /.content-wrapper -->
<footer class="main-footer">
  <strong>Copyright &copy; <?php echo date('Y') ?> <a href="http://adminlte.io">by TVRadix</a>
    <div class="float-right d-none d-sm-inline-block">
      <b>Version</b> 3.0.5
    </div>
</footer>

<!-- Control Sidebar -->
<aside class="control-sidebar control-sidebar-dark">
  <!-- Control sidebar content goes here -->
</aside>
<!-- /.control-sidebar -->
</div>
<!-- ./wrapper -->

<!-- jQuery -->
<script src="<?php echo _WEB_HOST_TEMPLATE_ADMIN ?>/assets/plugins/jquery/jquery.min.js"></script>
<!-- jQuery UI 1.11.4 -->
<script src="<?php echo _WEB_HOST_TEMPLATE_ADMIN ?>/assets/plugins/jquery-ui/jquery-ui.min.js"></script>
<!-- Resolve conflict in jQuery UI tooltip with Bootstrap tooltip -->
<script>
  $.widget.bridge('uibutton', $.ui.button)
</script>
<!-- Bootstrap 4 -->
<script src="<?php echo _WEB_HOST_TEMPLATE_ADMIN ?>/assets/plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
<!-- ChartJS -->
<script src="<?php echo _WEB_HOST_TEMPLATE_ADMIN ?>/assets/plugins/chart.js/Chart.min.js"></script>
<!-- Sparkline -->
<script src="<?php echo _WEB_HOST_TEMPLATE_ADMIN ?>/assets/plugins/sparklines/sparkline.js"></script>
<!-- JQVMap -->
<script src="<?php echo _WEB_HOST_TEMPLATE_ADMIN ?>/assets/plugins/jqvmap/jquery.vmap.min.js"></script>
<script src="<?php echo _WEB_HOST_TEMPLATE_ADMIN ?>/assets/plugins/jqvmap/maps/jquery.vmap.usa.js"></script>
<!-- jQuery Knob Chart -->
<script src="<?php echo _WEB_HOST_TEMPLATE_ADMIN ?>/assets/plugins/jquery-knob/jquery.knob.min.js"></script>
<!-- daterangepicker -->
<script src="<?php echo _WEB_HOST_TEMPLATE_ADMIN ?>/assets/plugins/moment/moment.min.js"></script>
<script src="<?php echo _WEB_HOST_TEMPLATE_ADMIN ?>/assets/plugins/daterangepicker/daterangepicker.js"></script>
<!-- Tempusdominus Bootstrap 4 -->
<script src="<?php echo _WEB_HOST_TEMPLATE_ADMIN ?>/assets/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js"></script>
<!-- Summernote -->
<script src="<?php echo _WEB_HOST_TEMPLATE_ADMIN ?>/assets/plugins/summernote/summernote-bs4.min.js"></script>
<!-- overlayScrollbars -->
<script src="<?php echo _WEB_HOST_TEMPLATE_ADMIN ?>/assets/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js"></script>
<script src="<?php echo _WEB_HOST_TEMPLATE_ADMIN ?>/assets/plugins/ion-rangeslider/js/ion.rangeSlider.min.js"></script>
<!-- AdminLTE App -->
<script src="<?php echo _WEB_HOST_TEMPLATE_ADMIN ?>/assets/js/adminlte.js"></script>
<!-- AdminLTE dashboard demo (This is only for demo purposes) -->
<script src="<?php echo _WEB_HOST_TEMPLATE_ADMIN ?>/assets/js/pages/dashboard.js"></script>
<!-- AdminLTE for demo purposes -->
<script src="<?php echo _WEB_HOST_TEMPLATE_ADMIN ?>/assets/js/demo.js"></script>


<script src="<?php echo _WEB_HOST_TEMPLATE_ADMIN ?>/assets/js/bootstrap-iconpicker.min.js"></script>

<script script src="<?php echo _WEB_HOST_TEMPLATE_ADMIN ?>/assets/js/jquery-menu-editor.min.js"></script>

<script type="text/javascript">
  // Lấy giá trị từ hàm PHP và chuyển đổi sang JSON để đảm bảo rằng chuỗi kết quả đúng định dạng
  var getModule = <?php echo json_encode(getPremaLink(getBody()['module'])); ?>;
  var perFix = <?php echo json_encode(_WEB_HOST_ROOT . '/'); ?>;
  // console.log(perFix + getModule);
</script>

<script src="<?php echo _WEB_HOST_TEMPLATE_ADMIN ?>/assets/js/custom.js"></script>
</body>

</html>