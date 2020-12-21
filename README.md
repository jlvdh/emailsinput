# Emails input

This component is part of an assignment for Miro. Emailsinput provides an input like:

![screenshot](https://github.com/jlvdh/emailsinput/blob/master/screenshot.png?raw=true)

[demo](https://jlvdh.github.io/emailsinput/)
## Build, run, test instructions

```
yarn install
```

```
yarn run
yarn build
yarn test
```

## How to use

in your html:
```
<input type="email" id="emails-input">
```

in your js
```
var input = document.getElementById('emails-input');
var emailsInput = emailsinput.create(input);
```

## Considerations:

The emails are stored in the value attribute of the provided <input> in a comma separated format (eg. email,email), as this provides the most clear and seamless way to integrate this component in any stack.

All css is inline, id's and classes are used to a minimum to ensure a high level of encapsulation.
