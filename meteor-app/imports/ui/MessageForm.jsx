import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';

export default function MessageForm() {
  const [text, setText] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (text.trim()) {
      Meteor.call('messages.send', text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Type a message"
      />
      <button type="submit">Send</button>
    </form>
  );
}
