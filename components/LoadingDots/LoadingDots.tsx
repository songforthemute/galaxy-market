// css
import s from "./LoadingDots.module.css";

const LoadingDots = () => {
    return (
        <span className={s.root}>
            <span className={s.dot} key={"loadingDot1"} />
            <span className={s.dot} key={"loadingDot2"} />
            <span className={s.dot} key={"loadingDot3"} />
        </span>
    );
};

export default LoadingDots;
