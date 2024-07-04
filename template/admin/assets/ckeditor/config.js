/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function (config) {
  // Define changes to default configuration here. For example:
  // config.language = 'fr';
  // config.uiColor = '#AADC6E';
  // config.filebrowserBrowseUrl = 'plugins/ckfinder/ckfinder.html';
  // config.filebrowserBrowseUrl = 'ckfinder/ckfinder.html';

  // config.filebrowserUploadUrl = 'ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files';

  config.filebrowserBrowseUrl =
    "/radix/template/admin/assets/ckfinder/ckfinder.html";
  config.filebrowserImageBrowseUrl =
    "/radix/template/admin/assets/ckfinder/ckfinder.html?type=Images";
  config.filebrowserUploadUrl =
    "/radix/template/admin/assets/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files";
  config.filebrowserImageUploadUrl =
    "/radix/template/admin/assets/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images";
};
