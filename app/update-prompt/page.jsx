"use client"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from 'next/navigation'
import Form from "@components/Form"

const UpdatePrompt = () => {
  const [submitting, setSubmitting] = useState(false)
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id')
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  })

  useEffect(() => {
    const getPromptDetails = async () => {
        const response = await fetch(`/api/prompts/${promptId}`)

        const data = await response.json();

        setPost({
            prompt: data.prompt,
            tag: data.tag,
        })

        // console.log(data)
    }

    promptId && getPromptDetails();
  }, [promptId])


  const router = useRouter();
  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true)

    !promptId && alert('PromptId not present')

    try {
      const response = await fetch(`api/prompts/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        })
      })
      if (response.ok){
        router.push('/');
      }
    } catch (error) {
      console.log(error)
    }
    finally{
      setSubmitting(false)
    }
  }

  return (
    <Form
      type = "Edit"
      post = {post}
      setPost = {setPost}
      submitting = {submitting}
      handleSubmit = {updatePrompt}
    />
  )
}

export default UpdatePrompt