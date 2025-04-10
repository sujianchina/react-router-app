import { Form, redirect, useNavigate } from "react-router";
import type { Route } from "./+types/edit-contact";

import invariant from "tiny-invariant";
import { getContact, updateContact } from "../data";

export async function loader({ params }: Route.LoaderArgs) {
  const contact = await getContact(params.contactId);
  if (!contact) {
    throw new Response("没找到", { status: 404 });
  }
  return { contact };
}

export async function action({ params, request }: Route.ActionArgs) {
  const formData = await request.formData();
  invariant(params.contactId, "Missing contactId param");
  const updates = Object.fromEntries(formData);
  await updateContact(params.contactId, updates);
  return redirect(`/contacts/${params.contactId}`);
}

export default function EditContact({ loaderData }: Route.ComponentProps) {
  const { contact } = loaderData;
  const navigate = useNavigate();
  // Compare this snippet from app/routes/contact.tsx:
  // import { Form } from "react-router";
  // import { getContact, type ContactRecord } from "../data";
  return (
    <Form key={contact.id} id="contact-form" method="post">
      <p>
        <span>姓名</span>
        <input
          aria-label="First name"
          defaultValue={contact.first}
          name="first"
          placeholder="姓氏"
          type="text"
        />
        <input
          aria-label="Last name"
          defaultValue={contact.last}
          name="last"
          placeholder="名字"
          type="text"
        />
      </p>
      <label>
        <span>微信</span>
        <input
          defaultValue={contact.twitter}
          name="twitter"
          placeholder="@zjchina"
          type="text"
        />
      </label>
      <label>
        <span>照片地址</span>
        <input
          aria-label="Avatar URL"
          defaultValue={contact.avatar}
          name="avatar"
          placeholder="https://example.com/avatar.jpg"
          type="text"
        />
      </label>
      <label>
        <span>备注</span>
        <textarea defaultValue={contact.notes} name="notes" rows={6} />
      </label>
      <p>
        <button type="submit">保存</button>
        <button onClick={() => navigate(-1)} type="button">
          删除
        </button>
      </p>
    </Form>
  );
}
