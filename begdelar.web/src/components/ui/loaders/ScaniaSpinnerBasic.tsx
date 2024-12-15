import './ScaniaSpinnerBasic.css'

type Props = {
    classOverride?: string
}
export const ScaniaSpinnerBasic = ({classOverride}: Props) => {
    return(
        <span className={"spinner-default " + classOverride}></span>
    )
}