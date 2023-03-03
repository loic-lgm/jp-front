import styles from '../styles/Home.module.css';

export default function Button({content, className}) {
  return (
    <button className={className}>{content}</button>
  )
}