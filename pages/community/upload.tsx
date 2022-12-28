import { useEffect } from "react";
import { useRouter } from "next/router";
// types
import type { NextPage } from "next";
import type { Post } from "@prisma/client";
// utils
import { useMutation } from "@libs/client";
// components
import { Layout, UploadPostForm } from "components";

interface UploadReturn {
    status: boolean;
    post: Post;
}

// Page
const UploadPosting: NextPage = () => {
    const { push } = useRouter();
    // mutation data
    const [upload, { loading, data }] = useMutation<UploadReturn>({
        url: "/api/posts",
        method: "POST",
    });

    // if success
    useEffect(() => {
        // sending user to 'community/data.post.id' (warp user to correspond posting)
        if (data && data.status) {
            push(`/community/${data.post.id}`);
        }
    }, [data, push]);

    return (
        <Layout title="질문하기" backwardButton configTab>
            <UploadPostForm mutatorFn={upload} loading={loading} />
        </Layout>
    );
};

export default UploadPosting;
