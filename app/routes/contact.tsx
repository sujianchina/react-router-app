import { Form, useFetcher } from "react-router";
import { getContact, updateContact, type ContactRecord } from "../data";
import type { Route } from "./+types/contact";

export async function loader({ params }: Route.LoaderArgs) {
  const contact = await getContact(params.contactId);
  if (!contact) {
    throw new Response("没找到", { status: 404 });
  }
  return { contact };
}

export async function action({ params, request }: Route.ActionArgs) {
  const formData = await request.formData();
  const favorite = formData.get("favorite") === "true";

  return updateContact(params.contactId, { favorite });
}

export default function Contact({ loaderData }: Route.ComponentProps) {
  const { contact } = loaderData;

  return (
    <div id="contact">
      <div>
        <img
          alt={`${contact.first} ${contact.last} avatar`}
          key={contact.avatar}
          src={contact.avatar}
        />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>没这个名字</i>
          )}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter ? (
          <p>
            <a href={`https://twitter.com/${contact.twitter}`}>
              {contact.twitter}
            </a>
          </p>
        ) : null}

        {contact.notes ? <p>{contact.notes}</p> : null}

        <div>
          <Form action="edit">
            <button type="submit">详情</button>
          </Form>

          <Form
            action="destroy"
            method="post"
            onSubmit={(event) => {
              const response = confirm(
                "请确认您要删除此记录吗？此操作无法撤销。"
              );
              if (!response) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">删除</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

function Favorite({ contact }: { contact: Pick<ContactRecord, "favorite"> }) {
  //const favorite = contact.favorite;
  const fetcher = useFetcher();
  const favorite = fetcher.formData
    ? fetcher.formData.get("favorite") === "true"
    : contact.favorite;
  return (
    <fetcher.Form method="post">
      <button
        aria-label={favorite ? "从收藏夹中删除" : "添加到收藏夹"}
        name="favorite"
        value={favorite ? "false" : "true"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
}
