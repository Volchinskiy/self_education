{
  class Formatter {
    constructor() {
      this.start();
    }

    FS = require('fs');
    PATH = './english/';
    MAX_STRING_LENGTH = 129;
    PLUG_STRING = 'FUNDAMENTAL';
    LESSON_RE = new RegExp(/{\d+}/, 'g'); // all strings that look like '{123}' '{1}' '{456}'.
    FILES = ['notebook_golden.txt', 'notebook_orange.txt', 'notebook_titanium.txt'];

    lines = [];
    lessons = [];
    currentFileName = null;
    currentFileData = null;

    start() {
      for (const fileName of this.FILES) {
        const fileData = this.FS.readFileSync(`${this.PATH}${fileName}`, 'utf-8');
        this.currentFileName = fileName;
        this.currentFileData = fileData;
        if (!fileData.endsWith('\n')) {
          this.addCarriageReturn();
          this.resetState();
          this.start();
          break;
        }
        this.lines = fileData.split('\n');
        this.extractLessons();
        this.formatLessons();
        this.appendLessons();
        this.saveFormattedFile();
        this.resetState();
      }
    }

    extractLessons() {
      for (let i = 0; i < this.lines.length; i++) {
        const line = this.lines[i];
        if (this.LESSON_RE.test(line)) {
          const start = ++i;
          let end = 0;
          for (let j = i; j < this.lines.length; j++) {
            const line = this.lines[j];
            if (!line) {
              end = j;
              break;
            }
          }
          const lesson = this.lines.slice(start, end);
          this.lessons.push(lesson);
          this.lines.splice(start, lesson.length, this.PLUG_STRING);
        }
      }
    }

    formatLessons() {
      const length = this.lessons.length;
      const maxLength = this.MAX_STRING_LENGTH;
      for (let i = 0; i < length; i++) {
        const lesson = this.lessons[i];
        let lessonAsString = lesson.join(' ');
        const newLesson = [];
        while (lessonAsString.length > maxLength) {
          let stringLeftPart = lessonAsString.slice(0, maxLength);
          if (stringLeftPart.startsWith(' ')) {
            stringLeftPart = lessonAsString.slice(1, maxLength + 1);
            const stringRightPart = lessonAsString.slice(maxLength + 1);
            newLesson.push(stringLeftPart);
            lessonAsString = stringRightPart;
          } else {
            const stringRightPart = lessonAsString.slice(maxLength);
            newLesson.push(stringLeftPart);
            lessonAsString = stringRightPart;
          }
        }
        if (lessonAsString) {
          if (lessonAsString.startsWith(' ')) newLesson.push(lessonAsString.slice(1));
          else newLesson.push(lessonAsString);
        }
        this.lessons[i] = newLesson;
      }
    }

    appendLessons() {
      for (let i = this.lines.length - 1, j = this.lessons.length - 1; 0 <= i; --i) {
        const line = this.lines[i];
        if (line === this.PLUG_STRING) {
          this.lines[i] = this.lessons[j];
          --j;
        }
      }
    }

    saveFormattedFile() {
      this.FS.writeFileSync(`${this.PATH}${this.currentFileName}`, this.lines.flat(Infinity).join('\n'));
    }

    addCarriageReturn() {
      this.FS.writeFileSync(`${this.PATH}${this.currentFileName}`, `${this.currentFileData}\n`);
    }

    resetState() {
      this.lines.length = 0;
      this.lessons.length = 0;
      this.currentFileName = null;
      this.currentFileData = null;
    }
  }

  new Formatter();
  console.log('test_ssh_key');
}
