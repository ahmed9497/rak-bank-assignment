import { createServer } from "miragejs";

createServer({
  routes() {
    this.get("/api/slides", () => 
    [
      { id: "0", title: "How was your week overall?" },
      { id: "1", title: "What do you like coffee or tea?" },
      { id: "2", title: "Happy or Sad?" },
      { id: "3", title: "Childhood is awesome?" },
      { id: "4", title: "Employed or Jobless?" },
    ]
    ),
    this.post("/submitPollForm", (_, request) => {
        let attrs = JSON.parse(request.requestBody)
        attrs.formId = Math.floor(Math.random() * 100)
  
        return { form: attrs }
      })

  },
})