FROM loadimpact/k6

COPY . .

CMD [ k6 run ./tests]