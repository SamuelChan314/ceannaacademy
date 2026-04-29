(function(){
  const header = document.querySelector('[data-header]');
  const menu = document.querySelector('.menu-toggle');
  if(menu && header){
    menu.addEventListener('click', () => {
      const isOpen = header.classList.toggle('nav-open');
      menu.setAttribute('aria-expanded', String(isOpen));
    });
  }
  const year = document.getElementById('year');
  if(year) year.textContent = new Date().getFullYear();

  const config = window.CEANNA_CONFIG || {};
  document.querySelectorAll('[data-config="email"]').forEach(el => { if(config.email) el.textContent = config.email; });
  document.querySelectorAll('[data-config="wechat"]').forEach(el => { if(config.wechat) el.textContent = config.wechat; });
  document.querySelectorAll('[data-config="phone"]').forEach(el => { if(config.phone) el.textContent = config.phone; });
  document.querySelectorAll('[data-config="location"]').forEach(el => { if(config.location) el.textContent = config.location; });

  const form = document.querySelector('[data-contact-form]');
  if(form){
    form.addEventListener('submit', event => {
      event.preventDefault();
      const status = form.querySelector('[data-form-status]');
      if(!config.email){
        status.textContent = 'Please add your business email in assets/js/config.js before using the contact form.';
        return;
      }
      const data = new FormData(form);
      const subject = encodeURIComponent('Ceanna Academy Inquiry - ' + (data.get('service') || 'Service'));
      const body = encodeURIComponent(
        'Name: ' + (data.get('name') || '') + '\n' +
        'Email: ' + (data.get('email') || '') + '\n' +
        'Phone: ' + (data.get('phone') || '') + '\n' +
        'Service: ' + (data.get('service') || '') + '\n\n' +
        (data.get('message') || '')
      );
      window.location.href = 'mailto:' + config.email + '?subject=' + subject + '&body=' + body;
      status.textContent = 'Opening your email app...';
    });
  }
})();