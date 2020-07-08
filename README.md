# @danielgiljam/logger

My logging solution for JavaScript full-stack applications.

> This project is on hold as of 2020-07-08!

## Editions

You may have noticed that this repository has two branches whose names end with `-edition`. They represent two incongruent design approaches that spontaneously emerged whilst working on the project.

The initial spark that started this project for me was that I was tired of rewriting the same logging level, environment detection and label prefixing logic in every single project I worked on. I had tried out and read about different logging libraries, but none of them did quite exactly what I wanted them to do. I liked the simplicity of [`loglevel`] but at the same time I liked the complexity of [`winston`] 😝. So I decided to write my own little logging library — a middle ground, sort of — and get down that logging level, label prefixing logic once and for all.

### `winston-edition`

From what I had read about JavaScript logging libraries, I recognized [`winston`] as the "industry-standard" logging library in the world of JavaScript. This is understandable due to it's scalable nature and abstract API.

I wanted my logging library to be as "production-quality" and professional as possible, so I thought what better way to secure those attributes was there than to build my library on top of [`winston`]?

### `no-deps-edition`

After working on the [`winston-edition`](#winston-edition) for quite a while — growing more and more annoyed at trying to get my vision to fit with the [`winston`] library's ecosystem — I got influenced by what Jake Archibald said in this speech about "wrangling your own code rather than wrangling other people's configs". It made me rethink my ideas and question why I was trying so hard to integrate my library with [`winston`].

I came to the conclusion that my original idea was to just get down the logging level, environment detection and label prefixing logic once and for all. Hence I split the repo into two editions. Then I took a pause. Wonder if the pause is still ongoing at the time when you're reading this? 👀

[`loglevel`]: https://github.com/pimterry/loglevel
[`winston`]: https://github.com/winstonjs/winston
