ساختار پروژه
- front-end/ — کدهای فرانت‌اند مبتنی بر React
- back-end/ — کدهای بک‌اند مبتنی بر Django، پایگاه داده و فایل‌های رسانه‌ای
پیش‌نیازها
- Node.js و npm
- Python 3
- pip
راه‌اندازی بک‌اند
ابتدا ترمینال را در پوشه back-end/ باز کنید و دستورات زیر را به‌ترتیب اجرا کنید:
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
پس از اجرای آخرین دستور، سرور توسعه Django اجرا می‌شود.

راه‌اندازی فرانت‌اند
یک ترمینال جدید باز کنید، وارد پوشه front-end/ شوید و دستورات زیر را اجرا کنید:
npm install
npm run dev
پس از اجرا، آدرس لوکال نمایش‌ داده میشود. آن را در مرورگر باز کنید.

توجه: 
admin username: Abolfazl
admin password: 1234
نکته: پیش از آزمایش قابلیت‌هایی که به API نیاز دارند، مطمئن شوید بک‌اند Django در حال اجرا است.
