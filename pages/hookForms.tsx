/**
 * { register, handleSubmit, watch, formState: { errors }} = useForm();
 *
 * register("") = {name, onBlur, onChange, ref}
 * watch() = {username: '12f12', email: '33', password: ''}처럼, 값 변경 추적
 *      => console.log(watch());
 *
 * <form onSubmit={handleSubmit(onValid, onInvalid?)}>
 * Ex. {...register("username", { required: true })}
 *      => 서브밋 시 부적절한 필드에 자동으로 커서를 옮겨줌.
 */

import { FieldErrors, useForm } from "react-hook-form";

interface LoginForm {
    username: string;
    email: string;
    password: string;
    error?: string;
}

// 더 적은 코드
// 더 나은 검증 과정과 코드
// 더 나은 에러 세팅과 클리어, 표시
// 인풋들에 대한 컨트롤 권한
// 이벤트에 대한 덜 상세한 관리
// 인풋 쉽게 만들기

const Hooks = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setValue,
        setError,
    } = useForm<LoginForm>({
        mode: "onBlur",
    });
    // = useForm<LoginForm>({ defaultValues: {} });

    function _onValid(data: LoginForm) {
        // 조건에 맞을 경우 호출될 함수
        console.log("_onValid is called!");
        console.log(data);

        // 백엔드가 오프라인인 경우
        setError("error", {
            message: "Backend is offline now. Please try again later.",
        });
    }
    function _onInvalid(err: FieldErrors) {
        // 조건에 맞지 않는 경우 호출될 함수
        console.log(err);
        // {username: { ... }, email: { ... } , password: { ... } }
        // => username : {message: "", ref: input, type: "minLength"}
    }

    setValue("email", "이메일");

    return (
        <div>
            <form
                onSubmit={handleSubmit(_onValid, _onInvalid)}
                style={{ display: "flex", flexDirection: "column" }}
            >
                <input
                    {...register("username", {
                        required: "Username is required.",
                        minLength: {
                            value: 5,
                            message:
                                "Username's value must be at least 5 characters.",
                        },
                    })}
                    type="text"
                    placeholder="Username"
                />
                <input
                    {...register("email", {
                        required: "Email is required.",
                        validate: {
                            notGmail: (v) =>
                                !v.includes("@gmail.com") ||
                                "Gmail is not a valid email address.",
                        },
                    })}
                    type="email"
                    placeholder="Email"
                    className={`${
                        Boolean(errors.email?.message)
                            ? "border-red-400 border-2"
                            : "border-lime-400 border-2"
                    }`}
                />
                {errors.email?.message}
                <input
                    {...register("password", {
                        required: "Password is required.",
                    })}
                    type="password"
                    placeholder="Password"
                />
                <input type="submit" value="Create Account!" />
            </form>
        </div>
    );
};

export default Hooks;
