// File js
//Xử lý check permission
$(document).ready(function () {

  $(".permission_list").on("change", 'input[type="checkbox"]', function () {

    let value = $(this).val();

   
    if (value === "edit" || value === "delete" || value === "duplicate") {
      // Tìm checkbox có value là add
      $(this)
        .closest("tr")
        .find('input[type="checkbox"][value="list"]')
        .prop("checked", true);
    }
  });
});

// Duyệt bình luận noti
$(document).ready(function () {
  $(document).on("click", ".btn-status", function () {
    let data_id = $(this).data("id");
    let $button = $(this); // Lưu trữ tham chiếu tới nút đã được click
    $(".noti-success-" + data_id).css("display", "block");
    setTimeout(function () {
      $(".noti-success-" + data_id).css("display", "none");
    }, 1000);

    //truyền dữ liệu qua ajax cập nhật bình luận
    $.ajax({
      url: "?module=comments&action=server",
      method: "POST",
      data: { data_id: data_id, action: "show" },
      dataType: "json",
      success: function (response) {
        console.log(response);
        $button.removeClass("btn-warning");
        $button.removeClass("btn-status");
        $button.removeAttr("data-id");
        $button.addClass("btn-success");
        $button.html("<i class='fa fa-check'></i> Đã duyệt");
        // Thêm nút 'Ẩn' vào DOM ngay sau nút 'Đã duyệt'
        $button.after(
          ` <span class='btn btn-sm btn-danger btn-hide' data-id=${response.data_id}><i class='fa fa-eye-slash'></i> Ẩn</span>`
        );
        $(".number-status-comment").text(response.countStatus);
        // console.log(response);
      },
      error: function (error) {
        console.error("Error:", error); // Log any error to the console
        $("#loading").removeClass("spinner-border spinner-border-sm");
        $("#btn-comment").attr("disabled", false);
      },
    });
  });

  // Trình xử lý sự kiện cho nút Ẩn
  $(document).on("click", ".btn-hide", function () {
    let data_id = $(this).data("id");
    let $button = $(this); // Lưu trữ tham chiếu tới nút đã được click
    $(".noti-hide-" + data_id).css("display", "block");
    setTimeout(function () {
      $(".noti-hide-" + data_id).css("display", "none");
    }, 1000);

    //truyền dữ liệu qua ajax cập nhật bình luận
    $.ajax({
      url: "?module=comments&action=server",
      method: "POST",
      data: { data_id: data_id, action: "hide" },
      dataType: "json",
      success: function (response) {
        // Ẩn nút 'Đã duyệt' và nút 'Ẩn'
        $button.prev(".btn-success").remove();
        $button.remove();

        // Hiển thị lại nút 'Hiển thị'
        $(".noti-success-" + data_id).before(
          "<span class='btn btn-sm btn-warning btn-status' data-id='" +
            data_id +
            "'><i class='fa fa-eye'></i> Hiển thị</span>"
        );
        $(".number-status-comment").text(response.countStatus);
        // console.log(response);
      },
      error: function (error) {
        console.error("Error:", error); // Log any error to the console
        $("#loading").removeClass("spinner-border spinner-border-sm");
        $("#btn-comment").attr("disabled", false);
      },
    });
  });
});

//Hàm chuyển đổi slug
function convertToSlug(str) {
  // Chuyển hết sang chữ thường
  str = str.toLowerCase();
  // xóa dấu
  str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, "a");
  str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, "e");
  str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, "i");
  str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, "o");
  str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, "u");
  str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, "y");
  str = str.replace(/(đ)/g, "d");
  // Xóa ký tự đặc biệt
  str = str.replace(/([^0-9a-z-\s])/g, "");
  // Xóa khoảng trắng thay bằng ký tự -
  str = str.replace(/(\s+)/g, "-");
  // Xóa ký tự - liên tiếp
  str = str.replace(/-+/g, "-");
  // xóa phần dự - ở đầu
  str = str.replace(/^-+/g, "");
  // xóa phần dư - ở cuối
  str = str.replace(/-+$/g, "");
  // return
  return str;
}

function updateItemsImages() {
  $(".btn-delete-items")
    .off("click")
    .on("click", function () {
      if (confirm("Bạn có chắc chắn muốn xóa không?")) {
        $(this).closest(".row").remove(); // Tìm đến thẻ cha gần nhất có class row và xóa nó
      }
    });

  //Code mở popup popup
  $(document).ready(function () {
    $(".choose-image")
      .off("click") //Loại bỏ sự kiện click trước đó
      .on("click", function () {
        console.log("OKE");
        let inputField = $(this).closest(".row").find(".thumbnail");
        console.log(inputField);
        CKFinder.popup({
          chooseFiles: true,
          width: 800,
          height: 600,
          onInit: function (finder) {
            finder.on("files:choose", function (evt) {
              let fileUrl = evt.data.files.first().getUrl();
              // Xử lý chèn link ảnh vào input của dòng hiện tại
              inputField.val(fileUrl);
              // console.log(fileUrl);
            });
            finder.on("file:choose:resizedImage", function (evt) {
              let fileUrl = evt.data.resizedUrl;
              // Xử lý chèn link ảnh vào input của dòng hiện tại
              inputField.val(fileUrl);
              // console.log(fileUrl);
            });
          },
        });
      });
  });
}

function addItemPartNer() {
  $(".btn-add-partner").click(function () {
    let str = `<div class="partner-item">
    <hr>
            <div class="row">
              <div class="col-12">
                <div class="close-icon">
                  <i class="fa fa-times p-2"></i>
                </div>
              </div>
            
              <div class="col-6">
                <div class="form-group">
                  <label for="">Tên đối tác</label>
                  <input type="text" class="form-control" name="home_partner_list[name][]" placeholder="Tên đối tác... " value="">
                  <?php echo form_error('partners_name', $error); ?>
                </div>
              </div>
              <div class="col-6">
                <div class="form-group">
                  <label for="">Link đối tác</label>
                  <input type="text" class="form-control" name="home_partner_list[link][]" placeholder="Link đối tác... " value="">
                  <?php echo form_error('partners_link', $error); ?>
                </div>
              </div>
                <div class="col-12">
                <div class="form-group ">
                  <label for="">Hình ảnh</label>
                  <div class="row">
                    <div class="col-10">
                      <input type="text" readonly class="form-control thumbnail" value="" name="home_partner_list[image][]" placeholder="Nhập ảnh nền....">
                    </div>
                    <div class="col-2">
                      <button type="button" class="btn btn-success choose-image w-100"><i class="fa fa-upload"></i> Tải ảnh</button>
                    </div>
                  </div>
                  <?php echo form_error('image', $error); ?>
                </div>
              </div>
            </div>
          </div>`;

    $(".partner-wrapper").append(str);

    $(".close-icon i")
      .off("click")
      .on("click", function () {
        console.log("oke");
        if (confirm("Bạn có chắc chắn muốn xóa không?")) {
          $(this).closest(".partner-item").remove(); // Tìm đến thẻ cha gần nhất có class row và xóa nó
        }
      });
    //Code mở popup popup
    $(document).ready(function () {
      $(".choose-image")
        .off("click") //Loại bỏ sự kiện click trước đó
        .on("click", function () {
          console.log("OKE");
          let inputField = $(this).closest(".row").find(".thumbnail");
          console.log(inputField);
          CKFinder.popup({
            chooseFiles: true,
            width: 800,
            height: 600,
            onInit: function (finder) {
              finder.on("files:choose", function (evt) {
                let fileUrl = evt.data.files.first().getUrl();
                // Xử lý chèn link ảnh vào input của dòng hiện tại
                inputField.val(fileUrl);
                // console.log(fileUrl);
              });
              finder.on("file:choose:resizedImage", function (evt) {
                let fileUrl = evt.data.resizedUrl;
                // Xử lý chèn link ảnh vào input của dòng hiện tại
                inputField.val(fileUrl);
                // console.log(fileUrl);
              });
            },
          });
        });
    });
  });
}

function addItemSlide() {
  let ver = 1;
  $(".btn-add-slide").click(function () {
    let str = `<div class='wp-item-slider ver-${ver}'>
    <div class="card-body">
          <div class="row">
            <div class="col-12">
              <div class="close-icon">
                <i class="fa fa-times p-2"></i>
              </div>
            </div>
            <div class="col-6">
              <div class="form-group">
                <label for="">Tiêu đề</label>
                <input type="text" class="form-control name" value="" name="home_slide[title_slider][]" placeholder="Tiêu đề slide... ">
                <?php echo form_error('title_slider', $error); ?>
              </div>
            </div>
            <div class="col-6">
              <div class="form-group">
                <label for="">Nút xem thêm</label>
                <input type="text" class="form-control name" value="" name="home_slide[button_slider][]" placeholder="Chữ của nút... ">
                <?php echo form_error('buuton_slider', $error); ?>
              </div>
            </div>
            <div class="col-6">
              <div class="form-group">
                <label for="">Link xem thêm</label>
                <input type="text" class="form-control name" value="" name="home_slide[link_slider][]" placeholder="Đường link liên kết... ">
                <?php echo form_error('link_slider', $error); ?>
              </div>
            </div>
            <div class="col-6">
              <div class="form-group">
                <label for="">Link Youtube</label>
                <input type="text" class="form-control name" value="" name="home_slide[video_slider][]" placeholder="Đường link liên kết... ">
                <?php echo form_error('video_slider', $error); ?>
              </div>
            </div>
            <div class="col-6">
              <div class="form-group ">
                <label for="">Ảnh 1</label>
                <div class="row">
                  <div class="col-9">
                    <input type="text" class="form-control thumbnail" value="" name="home_slide[image_silde_1][]" placeholder="Nhập ảnh slide....">
                  </div>
                  <div class="col-3">
                    <button type="button" class="btn btn-success choose-image w-100"><i class="fa fa-upload"></i> Tải ảnh</button>
                  </div>
                </div>
                <?php echo form_error('image_silde_1', $error); ?>
              </div>
            </div>
            <div class="col-6">
              <div class="form-group ">
                <label for="">Ảnh 2</label>
                <div class="row">
                  <div class="col-9">
                    <input type="text" class="form-control thumbnail" value="" name="home_slide[image_silde_2][]" placeholder="Nhập ảnh slide....">
                  </div>
                  <div class="col-3">
                    <button type="button" class="btn btn-success choose-image w-100"><i class="fa fa-upload"></i> Tải ảnh</button>
                  </div>
                </div>
                <?php echo form_error('image_silde_2', $error); ?>
              </div>
            </div>
            <div class="col-6">
              <div class="form-group ">
                <label for="">Ảnh nền</label>
                <div class="row">
                  <div class="col-9">
                    <input type="text" class="form-control thumbnail" value="" name="home_slide[slide_bg][]" placeholder="Nhập ảnh nền....">
                  </div>
                  <div class="col-3">
                    <button type="button" class="btn btn-success choose-image w-100"><i class="fa fa-upload"></i> Tải ảnh</button>
                  </div>
                </div>
                <?php echo form_error('slide_bg', $error); ?>
              </div>
            </div>
            <div class="col-6">
                <div class="form-group">
                    <label for="">Vị trí</label>
                    <select name="home_slide[position_slide][]" id="" class="form-control">
                      <option value="">Vị trí</option>
                      <option value="left">Trái</option>
                      <option value="right">Trái</option>
                      <option value="midle">Giữa</option>
                    </select>
                  <?php echo form_error('position_slider', $error); ?>
              </div>
            </div>
            <div class="col-12">
              <div class="form-group">
                <label for="">Mô tả</label>
                <textarea name="home_slide[desc_slider][]" rows="1" id="" class="form-control"></textarea>
                <?php echo form_error('link_slider', $error); ?>
              </div>
            </div>
          </div>
        </div>
        <hr>
        </div>`;
    ver++;
    $(".slide-item").append(str);

    $(".close-icon i")
      .off("click")
      .on("click", function () {
        console.log("oke");
        if (confirm("Bạn có chắc chắn muốn xóa không?")) {
          $(this).closest(".wp-item-slider").remove(); // Tìm đến thẻ cha gần nhất có class row và xóa nó
        }
      });
    //Code mở popup popup
    $(document).ready(function () {
      $(".choose-image")
        .off("click") //Loại bỏ sự kiện click trước đó
        .on("click", function () {
          console.log("OKE");
          let inputField = $(this).closest(".row").find(".thumbnail");
          console.log(inputField);
          CKFinder.popup({
            chooseFiles: true,
            width: 800,
            height: 600,
            onInit: function (finder) {
              finder.on("files:choose", function (evt) {
                let fileUrl = evt.data.files.first().getUrl();
                // Xử lý chèn link ảnh vào input của dòng hiện tại
                inputField.val(fileUrl);
                // console.log(fileUrl);
              });
              finder.on("file:choose:resizedImage", function (evt) {
                let fileUrl = evt.data.resizedUrl;
                // Xử lý chèn link ảnh vào input của dòng hiện tại
                inputField.val(fileUrl);
                // console.log(fileUrl);
              });
            },
          });
        });
    });
  });
}

//Hàm add item skill
function addItemSkill() {
  // alert("OKE");
  $(".btn-add-skill").on("click", function () {
    let str = `<div class="skill-item">
    <div class="row">
      <div class="col-12">
        <div class="close-icon">
          <i class="fa fa-times p-2"></i>
        </div>
      </div>
      <div class="col-6">
        <div class="form-group">
          <label for="">Tên năng lực</label>
          <input type="text" class="form-control"  name="home_about[skill][name][]" placeholder="Tên năng lực... " value="">
          <?php echo form_error('title_slider', $error); ?>
        </div>
      </div>
      <div class="col-6">
        <div class="form-group">
          <label for="">Giá trị</label>
          <input class="ranger" type="text" name="home_about[skill][values][]" value="">
          <?php echo form_error('title_slider', $error); ?>
        </div>
      </div>
    </div>
  </div>`;

    $(".skill-wrapper").append(str);
    $(".close-icon i")
      .off("click")
      .on("click", function () {
        console.log("oke");
        if (confirm("Bạn có chắc chắn muốn xóa không?")) {
          $(this).closest(".skill-item").remove(); // Tìm đến thẻ cha gần nhất có class row và xóa nó
        }
      });

    $(".ranger").ionRangeSlider({
      min: 0,
      max: 100,
      type: "single",
      step: 1,
      postfix: "%",
      prettify: false,
      hasGrid: true,
    });
  });
}

function addItemTeam() {
  // alert("OKE");
  $(".btn-add-team").on("click", function () {
    let str = `<hr>
    <div class="team-item">
              <div class="row">
             
                <div class="col-12">
                  <div class="close-icon">
                    <i class="fa fa-times p-2"></i>
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                    <label for="">Tên</label>
                    <input type="text" class="form-control" name="team_list[name][]" placeholder="Tên đội ngũ... " value="">
                    <?php echo form_error('title_slider', $error); ?>
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                    <label for="">Tên chức vụ</label>
                    <input type="text" class="form-control" name="team_list[position][]" placeholder="Tên đội ngũ... " value="">
                    <?php echo form_error('title_slider', $error); ?>
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group ">
                    <label for="">Hình ảnh</label>
                    <div class="row">
                      <div class="col-10">
                        <input type="text" readonly class="form-control thumbnail" value="" name="team_list[image][]" placeholder="Nhập ảnh nền....">
                      </div>
                      <div class="col-2">
                        <button type="button" class="btn btn-success choose-image w-100"><i class="fa fa-upload"></i></button>
                      </div>
                    </div>
                    <?php echo form_error('image', $error); ?>
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                    <label for="">Facebook</label>
                    <input type="text" class="form-control" name="team_list[facebook][]" placeholder="Tên đội ngũ... " value="">
                    <?php echo form_error('title_slider', $error); ?>
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                    <label for="">X</label>
                    <input type="text" class="form-control" name="team_list[x][]" placeholder="Tên đội ngũ... " value="">
                    <?php echo form_error('title_slider', $error); ?>
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                    <label for="">Linkedin</label>
                    <input type="text" class="form-control" name="team_list[linkedin][]" placeholder="Tên đội ngũ... " value="">
                    <?php echo form_error('title_slider', $error); ?>
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                    <label for="">Zalo</label>
                    <input type="text" class="form-control" name="team_list[zalo][]" placeholder="Tên đội ngũ... " value="">
                    <?php echo form_error('title_slider', $error); ?>
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                    <label for="">Behance</label>
                    <input type="text" class="form-control" name="team_list[behance][]" placeholder="Tên đội ngũ... " value="">
                    <?php echo form_error('title_slider', $error); ?>
                  </div>
                </div>
              </div>
            </div>`;

    $(".team-wrapper").append(str);
    $(".close-icon i")
      .off("click")
      .on("click", function () {
        console.log("oke");
        if (confirm("Bạn có chắc chắn muốn xóa không?")) {
          $(this).closest(".team-item").remove(); // Tìm đến thẻ cha gần nhất có class row và xóa nó
        }
      });

    $(".ranger").ionRangeSlider({
      min: 0,
      max: 100,
      type: "single",
      step: 1,
      postfix: "%",
      prettify: false,
      hasGrid: true,
    });

    $(document).ready(function () {
      $(".choose-image")
        .off("click") //Loại bỏ sự kiện click trước đó
        .on("click", function () {
          console.log("OKE");
          let inputField = $(this).closest(".row").find(".thumbnail");
          console.log(inputField);
          CKFinder.popup({
            chooseFiles: true,
            width: 800,
            height: 600,
            onInit: function (finder) {
              finder.on("files:choose", function (evt) {
                let fileUrl = evt.data.files.first().getUrl();
                // Xử lý chèn link ảnh vào input của dòng hiện tại
                inputField.val(fileUrl);
                // console.log(fileUrl);
              });
              finder.on("file:choose:resizedImage", function (evt) {
                let fileUrl = evt.data.resizedUrl;
                // Xử lý chèn link ảnh vào input của dòng hiện tại
                inputField.val(fileUrl);
                // console.log(fileUrl);
              });
            },
          });
        });
    });
  });
}

$(document).ready(function () {
  addItemPartNer();

  addItemTeam();

  addItemSkill();
  //Ranger skill

  //Xoá slider item
  addItemSlide();
  //Add slider item
  $(".close-icon i")
    .off("click")
    .on("click", function () {
      console.log("oke");
      if (confirm("Bạn có chắc chắn muốn xóa không?")) {
        $(this).closest(".wp-item-slider").remove(); // Tìm đến thẻ cha gần nhất có class row và xóa nó
        $(this).closest(".skill-item").remove(); // Tìm đến thẻ cha gần nhất có class row và xóa nó
        $(this).closest(".partner-item").remove(); // Tìm đến thẻ cha gần nhất có class row và xóa nó
        $(this).closest(".team-item").remove(); // Tìm đến thẻ cha gần nhất có class row và xóa nó
      }
    });

  //Xoá sessionStorage khi load trang
  if ($("input[name=slug]").val().trim() == "") {
    sessionStorage.removeItem("save_slug");
  }

  //Bắt sự kiẹn nhấn phím
  $(".name").keyup(function () {
    if (!sessionStorage.getItem("save_slug")) {
      let slug = convertToSlug($(this).val());
      $("input[name=slug]").val(slug);
    }
  });

  //Click ra ngoài input name lưu lại giá trị slug
  $(".name").change(function () {
    if (!sessionStorage.getItem("save_slug")) {
      let slug = convertToSlug($(".name").val());
      let url = $(".text-url").text();
      $(".text-url").text(url + "/" + getModule + "/" + slug + ".html");
    }
    sessionStorage.setItem("save_slug", 1);
  });

  //Click vào nút "Tự động điền" lấy slug
  $("#auto-slug").click(function () {
    let slug = convertToSlug($(".name").val());
    $("input[name=slug]").val(slug);
    $(".text-url").text("");
    $(".text-url").text(perFix + getModule + "/" + slug + ".html");
  });

  //Xử lý add items hình ảnh dự án
  let num = 1;
  $(".btn-add--items").click(function () {
    let str = `<div class="row mb-2" id="item-${num}">
                  <div class="col-9">
                    <input type="text" readonly class="form-control thumbnail" value="" name="gallery[]" placeholder="Nhập hình ảnh dự án....">
                  </div>
                  <div class="col-2">
                    <button type="button" class="btn btn-success choose-image w-100"><i class="fa fa-image"></i> Chọn hình ảnh</button>
                  </div>
                  <div class="col-1">
                    <button type="button" class="btn btn-delete-items btn-danger w-100"><i class="fa fa-times"></i></button>
                  </div>
                </div> `;
    num++;
    $(".wp-items").append(str);

    // Gọi lại hàm để cập nhật các sự kiện click cho các phần tử mới
    updateItemsImages();
  });

  updateItemsImages(); //gọi hàm
});

$(document).ready(function () {
  $(".choose-image")
    .off("click") //Loại bỏ sự kiện click trước đó
    .on("click", function () {
      console.log("OKE");
      let inputField = $(this).closest(".row").find(".thumbnail");
      console.log(inputField);
      CKFinder.popup({
        chooseFiles: true,
        width: 800,
        height: 600,
        onInit: function (finder) {
          finder.on("files:choose", function (evt) {
            let fileUrl = evt.data.files.first().getUrl();
            // Xử lý chèn link ảnh vào input của dòng hiện tại
            inputField.val(fileUrl);
            // console.log(fileUrl);
          });
          finder.on("file:choose:resizedImage", function (evt) {
            let fileUrl = evt.data.resizedUrl;
            // Xử lý chèn link ảnh vào input của dòng hiện tại
            inputField.val(fileUrl);
            // console.log(fileUrl);
          });
        },
      });
    });
});

//Xử lý CKEDITOR
let classTextarea = document.querySelectorAll(".editor");
if (classTextarea != null) {
  classTextarea.forEach((item, index) => {
    item.id = "editor_" + (index + 1);
    CKEDITOR.replace(item.id);
  });
}

// ClassicEditor.create(document.querySelector("#editor"), {
//   versionCheck: false,
// });

$(".ranger").ionRangeSlider({
  min: 0,
  max: 100,
  type: "single",
  step: 1,
  postfix: "%",
  prettify: false,
  hasGrid: true,
});

function callCommentStatus() {
  //truyền dữ liệu qua ajax cập nhật bình luận
  $.ajax({
    url: "?module=comments&action=server",
    method: "GET",
    dataType: "json",
    success: function (response) {
      $(".number-status-comment").text(response.countStatus);
    },
    error: function (error) {
      console.error("Error:", error); // Log any error to the console
      $("#loading").removeClass("spinner-border spinner-border-sm");
      $("#btn-comment").attr("disabled", false);
    },
  });
}

setInterval(callCommentStatus, 15000);

// icon picker options
var iconPickerOptions = { searchText: "Buscar...", labelHeader: "{0}/{1}" };
// sortable list options
var sortableListOptions = {
  placeholderCss: { "background-color": "#cccccc" },
};
var editor = new MenuEditor("myEditor", {
  listOptions: sortableListOptions,
  iconPicker: iconPickerOptions,
  maxLevel: 2, // (Optional) Default is -1 (no level limit)
  // Valid levels are from [0, 1, 2, 3,...N]
});
editor.setForm($("#frmEdit"));
editor.setUpdateButton($("#btnUpdate"));
//Calling the update method
$("#btnUpdate").click(function () {
  editor.update();
});
// Calling the add method
$("#btnAdd").click(function () {
  editor.add();
});

editor.setData(arrayJson);

if ($(".btn-save-menu").length > 0) {
  $(".btn-save-menu").on("click", function (e) {
    e.preventDefault();
    var str = editor.getString();
    $("#menu-content").val(str);
    $("#frmEdit").submit();
  });
}
