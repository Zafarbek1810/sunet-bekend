import mailService from "../service/mail-service.js";
import fs from "fs";
import formidable from "formidable";
const receiverEmailAddress = "zafarbekyoldoshev1810@gmail.com"

class Controller {

  async sendContactEmail(req, res, next) {
    try {
      const form = formidable({ multiples: true, keepExtensions: true });


      form.parse(req, async (err, fields, files) => {

        console.log('fields: ', fields);
        console.log('files: ', files);

        console.log('files: ', files['file[]'].filepath);
        const { email, message, name, phoneNumber } = req.body;

        const mailObj = {
          from: "LogELD WEBSITE",
          to: receiverEmailAddress,
          subject: `From this email came a message: ${email}`,
          text: "",
          html: `
        <div style="background: rgba(0, 0, 255, 0.15); padding:15px; border-radius: 12px; box-shadow: 5px 5px 20px 0 rgba(0, 0, 0, 0.75);">
          <p>Имя: ${fields.name}</p>
          <p>Электронная почта: ${fields.email}</p>
          <p>Номер телефона: ${fields.phoneNumber}</p>
          <p>Сообщение: ${fields.message}</p>
          
          </div>
          `,
          attachments: [
            {
              'filename': files['file[]'].originalFilename,
              'path': files['file[]'].filepath
            }
          ],
        }

        await mailService.sendContactEmail(mailObj);
        res.json({ message: "Email has been sent" })
        res.send({ success: true });
      });
      // var form = new formidable.IncomingForm();
      // form.parse(req, function (err, fields, files) {
      //   var oldpath = files.filetoupload.filepath;
      //   var newpath = 'C:/Users/Your Name/' + files.filetoupload.originalFilename;
      //   fs.rename(oldpath, newpath, function (err) {
      //     if (err) throw err;
      //     res.write('File uploaded and moved!');
      //     res.end();
      //   });
      // });
      //next();


    } catch (err) {
      next(err);
    }
  }
  async sendContactEmail2(req, res, next) {
    try {
      const { email, message, name, phone } = req.body;

      const mailObj = {
        from: "LogELD WEBSITE",
        to: receiverEmailAddress,
        subject: `From this email came a message: ${email}`,
        text: "",
        html: `
        <div style="background: rgba(0, 0, 255, 0.15); padding:15px; border-radius: 12px; box-shadow: 5px 5px 20px 0 rgba(0, 0, 0, 0.75);">
          <p>Имя: ${name}</p>
          <p>Электронная почта: ${email}</p>
          <p>Номер телефона: ${phone}</p>
          <p>Сообщение: ${message}</p>
          
        </div>
        `
      }

      await mailService.sendContactEmail(mailObj);
      res.json({ message: "Email has been sent" })
    } catch (err) {
      next(err);
    }
  }
  async sendContactEmail3(req, res, next) {
    try {
      const { email, message, name, site } = req.body;

      const mailObj = {
        from: "LogELD WEBSITE",
        to: receiverEmailAddress,
        subject: `From this email came a message: ${email}`,
        text: "",
        html: `
        <div style="background: rgba(0, 0, 255, 0.15); padding:15px; border-radius: 12px; box-shadow: 5px 5px 20px 0 rgba(0, 0, 0, 0.75);">
          <p>Имя: ${name}</p>
          <p>Электронная почта: ${email}</p>
          <p>Веб-сайт: ${site}</p>
          <p>Сообщение: ${message}</p>
          
        </div>
        `
      }

      await mailService.sendContactEmail(mailObj);
      res.json({ message: "Email has been sent" })
    } catch (err) {
      next(err);
    }
  }
}

const controller = new Controller();
export default controller;
