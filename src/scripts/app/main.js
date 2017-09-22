'use strict';

define(['layer', 'additional.methods'], function (layer, validate) {

  // 初始化模块
  var module = {
    options: {
      loginForm: ''
    }
  };

  // 定义init方法
  module.init = function(options) {
    this.options = $.extend({}, this.options, options);
    this.run();
  }

  // run函数
  module.run = function(){
    var form = this.options.loginForm;
    $(form).validate({
      rules: {
        username: {
          required: true
        },
        password: {
          required: true
        }
      },
      messages: {
        username: {
          required: '帐号不能为空'
        },
        password: {
          required: '密码不能为空'
        }
      },
      errorElement: 'p',
      errorClass: 'error text-danger',
      errorPlacement: function(error, element) {
        error.appendTo( element.parent().parent() );
      },
      /*showErrors: function(errorMap, errorList) {
        var errTip = $('<div />').addClass('alert alert-danger').css('display', 'none');
        if($(form).find('.alert').length == 0) {
          $(form).find('.form-group:first').before(errTip);
        }
        for(var name in errorMap) {
          $(form).find('.alert').html(errorMap[name]).slideDown();
          return false;
        }
      },*/
      // 验证通过后
      submitHandler: function(form) {
        var username = $(form).find('input[name=username]').val();
        var password = $(form).find('input[name=password]').val();
        $.ajax({
          type: $(form).attr('method'),
          data: $(form).serialize(),
          success: function(data) {
            // TODO: 判断返回结果
            if('admin' == username && '111111' == password) {
              $(form).after($('<h2 />').html('welcome to ' + username + '!!!'));
              $(form).remove();
            } else {
              layer.msg('用户登录失败');
            }
            return false;
          }
        });
        return false;
      }
    });
  }

  return module;
});