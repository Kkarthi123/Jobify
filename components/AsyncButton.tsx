import DotLoaders from '@/components/DotLoaders';

const AsyncButton = ({buttonName, customButtonClass, buttonTooltip, isActionRunning, onButtonClick=null, buttonType}:any) => {
  return (
    <button type={buttonType} className={`min-h-[40px] cursor-pointer ${customButtonClass}`} title={buttonTooltip} onClick={onButtonClick}>
        {isActionRunning ? <DotLoaders />: buttonName}
    </button>
  )
}

export default AsyncButton