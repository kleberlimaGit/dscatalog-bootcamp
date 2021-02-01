import Bold from 'core/assets/images/Bold.svg';
import Italic from 'core/assets/images/Italic.svg';
import Unordered from 'core/assets/images/BallMark.svg';
import Ordered from 'core/assets/images/NumberMark.svg';

 const toolbar = {
  options: ['inline', 'list'],
  inline: {
    bold: { icon: Bold, className: 'custom-icon' },
    italic: { icon: Italic, className: 'custom-icon' },
    options: ['bold', 'italic'],
  },
  list: {
    options: ['unordered', 'ordered'],
    unordered: { icon: Unordered, className: 'custom-icon' },
    ordered: { icon: Ordered, className: 'custom-icon' }
  },
}

export default toolbar;