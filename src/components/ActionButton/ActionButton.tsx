import './ActionButton.scss'

interface ActionButtonProps {
  onClick?: () => void;
  type?: 'home' | 'select'; 
}

export const ActionButton = ({ onClick, type = 'select' }: ActionButtonProps) => {
  return (
    <div 
      className={`action-button ${type}`} 
      onClick={onClick}
    >
      {type === 'home' ? 'Get Started' : 'Select'}
    </div>
  )
}
