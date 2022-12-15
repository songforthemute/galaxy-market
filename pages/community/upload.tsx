import { useEffect } from "react";
import { useRouter } from "next/router";
// types
import type { NextPage } from "next";
import type { Post } from "@prisma/client";
// custom hooks
import useMutation from "@libs/client/useMutation";
// components
import Layout from "@components/layout";
import { UploadPostForm } from "@components/Templetes";

interface UploadReturn {
    status: boolean;
    post: Post;
}

// Page
const UploadPosting: NextPage = () => {
    const router = useRouter();
    // mutation data
    const [upload, { loading, data }] = useMutation<UploadReturn>({
        url: "/api/posts",
        method: "POST",
    });

    // if success
    useEffect(() => {
        // sending user to 'community/data.post.id' (warp user to correspond posting)
        if (data && data.status) {
            router.push(`/community/${data.post.id}`);
        }
    }, [data, router]);

    return (
        <Layout title="질문하기" canGoBack>
            <UploadPostForm mutatorFn={upload} loading={loading} />
        </Layout>
    );
};

export default UploadPosting;
