
        const form = document.getElementById("parent_form");
        const text = document.getElementById("text");
        const topic = document.getElementById("topic");
        const video_link_form = document.getElementById("video_link");
        const video_link_input = document.getElementById("vide");
        const add_note = document.getElementById("New_note");
        let currentIframe = document.getElementById("content");
        let cleaner = document.getElementById("cleaner");
        const message = document.getElementById("message");

        cleaner.addEventListener('click', (e) => {
            document.getElementById("foot").textContent = "";
            document.getElementById("foot").style.padding = "0px";
        });

        add_note.addEventListener('click', (e) => {
            form.style.display = "flex";
            add_note.style.display = "none";
        });

        video_link_form.addEventListener('submit', (e) => {
            e.preventDefault();
            const new_video_embed = video_link_input.value;
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = new_video_embed.trim();
            const newIframe = tempDiv.querySelector('iframe');
            
            if (newIframe && newIframe.src) {
                newIframe.id = "content";
                newIframe.style.padding = "10px";
                newIframe.style.width = "100%";
                newIframe.height = "400px";
                
                const right_div = document.getElementById("right");
                right_div.replaceChild(newIframe, currentIframe);
                currentIframe = newIframe;
            } else {
                console.error("Invalid iframe input.");
            }
            video_link_input.value = " ";
        });

        let count = 0;
        let id = -1;
        const memory = [];

        function create_note(passingText, noteTopic, id) {
            return {
                Topic: noteTopic,
                content: passingText,
                id: id
            };
        }

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            id += 1;
            const passingText = text.value.trim();
            const noteTopic = topic.value.trim();
            const obj = create_note(passingText, noteTopic, id);
            memory.push(obj);
            if (noteTopic && passingText) {
                add_note.style.display = "block";
                addNote(noteTopic, passingText);
                form.style.display = "none";
                topic.value = "";
                text.value = "";
            }
        });

        function addNote(topic, text) {
            if (count === 0) {
                message.style.display = "block";
            }
            const date = updateDate();
            const time = updateTime();
            const tag = document.createElement("p");
            const createText = document.createTextNode(`Topic: ${topic} ---> Date: ${date} Time: ${time} `);
            tag.appendChild(createText);
            document.getElementById("left").appendChild(tag);
            count += 1;
            const paras = document.querySelectorAll('p');
            const length = paras.length;
            paras.forEach((e) => {
                e.addEventListener('click', (e) => {
                    e.stopPropagation();
                    for (let i = 0; i < length; i++) {
                        if (e.target.textContent.includes(memory[i].Topic)) {
                            document.getElementById("foot").textContent = memory[i].content;
                            document.getElementById("foot").style.padding = "10px";
                        }
                    }
                }, false);
                
                e.addEventListener('dblclick', (e) => {
                    e.stopPropagation();
                    if (confirm('Are you sure you want to delete this note?')) {
                        document.getElementById('left').removeChild(e.target);
                        count -= 1;
                        if (count === 0) {
                            message.style.display = "none";
                        }
                    }
                }, false);
            });
        }

        function updateDate() {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            return `${day}/${month}/${year}`;
        }

        function updateTime() {
            const now = new Date();
            let hours = now.getHours();
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12 || 12;
            return `${String(hours).padStart(2, '0')}:${minutes}:${seconds} ${ampm}`;
        }
    