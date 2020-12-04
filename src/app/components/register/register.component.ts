import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {NotificationService} from "../../../services/notification.service";
import {Role} from "../../models/role.model";
import {DateTimeService} from "../../../services/date-time.service";
import * as moment from "moment";

interface PasswordValidationResult {
  passwordEmpty: boolean,
  passwordTooShort: boolean,
  passwordTooLong: boolean,
  passwordNotEqualVerifyPassword: boolean
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {

  private _registerForm: FormGroup;

  constructor(
    private ns: NotificationService,
    private dateTimeService: DateTimeService
  ) {
    this._registerForm = new FormGroup({
      phone: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      verifyPassword: new FormControl(null, Validators.required),
      email: new FormControl(null),
      firstName: new FormControl(null, Validators.required),
      middleName: new FormControl(null),
      lastName: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      birthday: new FormControl(null, Validators.required),
      insurancePolicyNumber: new FormControl(
        null,
        [
          Validators.required,
          Validators.minLength(16),
          Validators.maxLength(16),
          this.insurancePolicyNumberValidator.bind(this)
        ]
      )
    }, this.passwordValidator.bind(this))
  }

  get registerForm(): FormGroup {
    return this._registerForm;
  }

  ngOnInit(): void {
  }

  //FIXME refactor

  onRegister() {
    this.ns.clear();

    if (this.registerForm.invalid) {
      if (this.registerForm.errors) {
        let passwordErrors: PasswordValidationResult = this.registerForm.errors.passwordValidations;
        if (passwordErrors) {
          let message = null;
          if (passwordErrors.passwordEmpty) {
            message = "Поля Пароль и Повторите пароль обязательны для заполнения.";
          } else if (passwordErrors.passwordTooShort) {
            message = "Пароль должен быть длиной не менее 6 символов.";
          } else if (passwordErrors.passwordTooLong) {
            message = "Пароль должен быть длиной не более 20 символов.";
          } else if (passwordErrors.passwordNotEqualVerifyPassword) {
            message = "Пароли не совпадают.";
          }
          if (message) {
            this.ns.error(message);
          }
        }
      }

      let phoneErrors = this.registerForm.get("phone").errors;
      let firstNameErrors = this.registerForm.get("firstName").errors;
      let lastNameErrors = this.registerForm.get("lastName").errors;
      let addressErrors = this.registerForm.get("address").errors;
      let birthdayErrors = this.registerForm.get("birthday").errors;
      let insurancePolicyNumberErrors = this.registerForm.get("insurancePolicyNumber").errors;
      if (phoneErrors) {
        this.ifRequired(phoneErrors, "Мобильный телефон");
      }
      if (firstNameErrors) {
        this.ifRequired(firstNameErrors, "Имя");
      }
      if (lastNameErrors) {
        this.ifRequired(lastNameErrors, "Фамилия");
      }
      if (addressErrors) {
        this.ifRequired(addressErrors, "Адрес регистрации");
      }
      if (birthdayErrors) {
        this.ifRequired(birthdayErrors, "Дата рождения");
      }
      if (insurancePolicyNumberErrors) {
        this.ifRequired(insurancePolicyNumberErrors, "Полис ОМС");
        this.ifOutOfBounds(insurancePolicyNumberErrors, "Полис ОМС");
        if (insurancePolicyNumberErrors.insurancePolicyNumberValidations) {
          this.ifNotNumeric(insurancePolicyNumberErrors.insurancePolicyNumberValidations, "Полис ОМС");
        }
      }
    } else { //ok
      let formValue = this.registerForm.value;
      // let patient = new Patient(
      //   formValue.phone,
      //   formValue.password,
      //   formValue.email,
      //   Role.ROLE_PATIENT,
      //   formValue.firstName,
      //   formValue.lastName,
      //   formValue.middleName,
      //   formValue.address,
      //   moment(formValue.birthday, "YYYY-MM-DD").format("DD MMM YYYY"),
      //   formValue.insurancePolicyNumber
      // );
      // this.patientsService.register(patient)
      //   .subscribe(() => {
      //     this.ns.info("Регистрация завершена.");
      //   }, (error) => {
      //     this.ns.error("Что-то пошло не так. См. консоль F12.");
      //     console.error(error);
      //   })
    }
  }

  private ifRequired(errors: any, name: string) {
    let message = null;
    if (errors.required) {
      message = this.getRequiredMessage(name);
    }
    if (message) {
      this.ns.error(message);
    }
  }

  private ifNotNumeric(errors: any, name: string) {
    let message = null;
    if (!errors.isNumeric) {
      message = `Поле ${name} должно состоять только из цифр.`;
    }
    if (message) {
      this.ns.error(message);
    }
  }

  private ifOutOfBounds(errors: any, name: string) {
    let message = "";
    if (errors.minlength) {
      message += `Поле ${name} по длине должно быть не менее ${errors.minlength.requiredLength}. `;
    } else if (errors.maxlength) {
      message += `Поле ${name} по длине должно быть не более ${errors.maxlength.requiredLength}. `;
    }
    if (message && message !== "") {
      this.ns.error(message);
    }
  }

  private getRequiredMessage(name: string): string {
    return `Поле ${name} обязательно для заполнения.`;
  }

  private passwordValidator(control: FormGroup): ValidationErrors | null {
    const password = control.get('password').value;
    const verifyPassword = control.get('verifyPassword').value;

    let error = {
      passwordEmpty: false,
      passwordTooShort: false,
      passwordTooLong: false,
      passwordNotEqualVerifyPassword: false
    }

    error.passwordEmpty = !password || !verifyPassword;
    if (!error.passwordEmpty) {
      error.passwordTooShort = password.length < 6;
      error.passwordTooLong = password.length > 20;
      error.passwordNotEqualVerifyPassword = password !== verifyPassword;
    }

    let isError = error.passwordEmpty
      || error.passwordTooShort
      || error.passwordTooLong
      || error.passwordNotEqualVerifyPassword;

    return isError ? {passwordValidations: error} : null;
  }

  private insurancePolicyNumberValidator(control: FormControl): ValidationErrors | null {
    let value = control.value;
    let regex: RegExp = /\d*/;

    return !regex.test(value) ? {insurancePolicyNumberValidations: {isNumeric: false}} : null;
  }

}
