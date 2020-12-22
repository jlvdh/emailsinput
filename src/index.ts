import createElement from './createElement';
import isEmail from './isEmail';
import addStyling from './addStyling';
import {
  containerStyles,
  emailLabelStyle,
  emailErrorLabelStyle,
  emailDeleteButtonStyle,
  emailInputStyle,
} from './style';

class EmailsInput {
  private inputElement: HTMLInputElement;
  private className: string;

  constructor(targetElement: HTMLInputElement, className = '') {
    this.inputElement = targetElement;
    this.initialise();
    this.className = className;
  }

  private initialise = () => {
    this.inputElement.type = 'hidden';
    this.listenInputTargetChange();
    this.renderInitial();
  };

  private listenInputTargetChange = () => {
    const that = this;
    Object.defineProperty(this.inputElement, 'value', {
      get: function() {
        return this._value;
      },
      set: function(v) {
        this._value = v;
        that.renderLabels(this.previousSibling.firstChild);
      },
    });
  };

  private renderInitial = () => {
    // create initial HTML
    const container = createElement('div', {
      attributes: { className: this.className ?? 'emails-input' },
      styling: containerStyles,
    });
    const labelsContainer = createElement('span');
    const field = createElement('input', {
      attributes: { type: 'email', placeholder: 'add more people...' },
      styling: emailInputStyle,
    });

    container.appendChild(labelsContainer);
    container.appendChild(field);

    // listen for delete button
    labelsContainer.addEventListener('click', e => {
      if (
        (e.target as HTMLElement).classList.contains('__delete-email-button')
      ) {
        this.deleteEmail(+(e.target as HTMLElement).id.substring(15));
      }
    });

    /** focus on click in component */
    container.addEventListener('click', e => {
      const field = (e.currentTarget as HTMLElement).getElementsByTagName(
        'input'
      );
      field[0].focus();
    });

    field.addEventListener('keydown', this.handleKeyInput);
    field.addEventListener('paste', this.handlePaste);
    field.addEventListener('blur', this.handleBlur);

    this.inputElement.parentNode!.insertBefore(container, this.inputElement);
  };

  private getEmails = () => {
    if (!this.inputElement.value) return [];
    return this.inputElement.value.split(',');
  };

  private deleteEmail = (index: number) => {
    const emails = this.getEmails();
    emails.splice(index, 1);
    this.inputElement.value = emails.toString();
  };

  private addEmail = (email: string) => {
    if (!email) return;
    if (this.inputElement.value) {
      this.inputElement.value = `${this.inputElement.value}, ${email.trim()}`;
    } else {
      this.inputElement.value = email.trim();
    }
  };

  private renderLabels = (labelsContainer: HTMLElement) => {
    labelsContainer.innerHTML = '';
    const emails = this.getEmails();
    emails.forEach((email: string, index: number) => {
      const deleteButton = this.createDeleteButton(index);
      const emailLabel = this.createEmailLabel(email);
      emailLabel.appendChild(deleteButton);
      labelsContainer.appendChild(emailLabel);
    });
  };

  private createEmailLabel = (email: string) => {
    const emailLabel = createElement('div', { styling: emailLabelStyle });
    emailLabel.innerHTML = email;
    if (!isEmail(email)) {
      addStyling(emailLabel, emailErrorLabelStyle);
    }
    return emailLabel;
  };

  private createDeleteButton = (index: number) => {
    return createElement('button', {
      attributes: {
        id: `__delete-label-${index.toString()}`,
        className: '__delete-email-button',
      },
      styling: emailDeleteButtonStyle,
    });
  };

  private handleKeyInput = (e: KeyboardEvent) => {
    const { value } = e.target as HTMLInputElement;
    if (isActionKey(e.key)) {
      // prevent default to prevent ',' being added to input
      e.preventDefault();
      this.addEmail(value);
      (e.target as HTMLInputElement).value = '';
    }
  };

  private handlePaste = (e: ClipboardEvent) => {
    // using setTimeout as an alternative to clipboard data as it's not supported by IE11
    setTimeout(() => {
      let input = (e.target as HTMLInputElement).value.trim();
      if (input.charAt(input.length - 1) === ',') {
        input = input.slice(0, -1);
      }
      this.addEmail(input);
      (e.target as HTMLInputElement).value = '';
    }, 100);
  };

  private handleBlur = (e: FocusEvent) => {
    const { value } = e.target as HTMLInputElement;
    this.addEmail(value);
    (e.target as HTMLInputElement).value = '';
  };
}

const isActionKey = (code: string): boolean => {
  // check event.key
  switch (code) {
    case 'Enter':
    case ',':
      return true;
    default:
      return false;
  }
};

export const create = (div: HTMLInputElement) => {
  new EmailsInput(div);
};
