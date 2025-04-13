# PLEASE READ THIS

Go to the backend folder and run this prompt
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000 --reload

Go to the frontend folder and run this prompt
yarn / npm install
yarn dev / npm run dev

- i already add unit-test so you guys could test using
  pytest -v (-v for better log)

- and i used charts too for better simulation of sales dashboard

- already integrated the apps with google gemini so we could call the apps being "AI Wrapper" app

- on the table/datagrid we could search for names, roles and region that we want

- we could click the detail on skills, deals and clients on the table for displaying detail of the skill, deals and clients

- you could hover to the charts for better information (on every charts) just please hover to the charts for test it :D

- i don't use form(because i think we don't need it because it's a simple field just question) and we could handle it in the button, to check either the text field is empty or not by trim it

- already implemented markdown and effect of response from AI for better ui/ux

- the table already implemented pagination and limit offset for faster fetching data from service.
