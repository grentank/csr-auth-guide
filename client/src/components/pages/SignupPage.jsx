import React from 'react';

export default function SignupPage() {
  return (
    <form>
      <label htmlFor="emailid">
        Email
        <input name="email" type="email" id="emailid" />
      </label>
      <label htmlFor="passwordid">
        Password
        <input name="password" type="password" id="passwordid" />
      </label>
      <label htmlFor="nameid">
        Name
        <input name="name" type="text" id="nameid" />
      </label>
      <button type="submit">Sign up</button>
    </form>
  );
}
