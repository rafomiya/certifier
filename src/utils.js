export const isEmpty = str => str.trim().length === 0;
export const redefineUnit = () => {
  console.log('redefining unit...');
  document.body.style.setProperty('--unit', document.getElementById("preview-container").offsetWidth / 100 + 'px');
};
