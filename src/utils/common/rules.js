// 手机号校验
export const checkPhoneNumber = async (rule, value) => {
  if (rule.required && !value) {
    return Promise.reject('请输入手机号');
  }
  if (value) {
    const reg = /^1[345789]\d{9}$/;
    if (!reg.test(value)) {
      return Promise.reject('请输入正确的手机号格式');
    } else {
      return Promise.resolve();
    }
  }
};

// 验证邮箱
export const validatorEnterpriseEmail = async (rule, value) => {
  if (rule.required && !value) {
    return Promise.reject('请输入邮箱');
  }
  if (value) {
    const reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
    if (!reg.test(value)) {
      return Promise.reject('请输入正确的邮箱格式');
    } else {
      return Promise.resolve();
    }
  }
};

// 验证身份证
export const checkIdentityCode = async (_rule, value) => {
  if (_rule.required && !value) {
    return Promise.reject('请输入身份证号');
  }
  if (value) {
    let reg = /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    if (!reg.test(value)) {
      return Promise.reject('身份证格式不正确!');
    } else {
      return Promise.resolve();
    }
  }
};

// 验证是否是数字英文下划线
export const isNumberEnglish =  (str) => {
  const regex = /^[a-zA-Z0-9_]+$/;
  return regex.test(str);
};
