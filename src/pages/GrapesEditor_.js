import React, { useEffect, useRef } from 'react';
import 'grapesjs/dist/css/grapes.min.css';
import grapesjs from 'grapesjs';

function GrapesEditor() {



    const editorRef = useRef(null)
    const blockRef = useRef(null)
    const panel__topRef = useRef(null)
    const panel__basic_actionsRef = useRef(null)

    useEffect(() => {
        const editor = grapesjs.init({
            // Indicate where to init the editor. You can also pass an HTMLElement
            container: editorRef.current,
            // Get the content for the canvas directly from the element
            // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
            fromElement: true,
            // Size of the editor
            height: '600px',
            width: 'auto',
            // Disable the storage manager for the moment
            storageManager: false,

            blockManager: {
                appendTo: blockRef.current,
                blocks: [
                  {
                    id: 'section', // id is mandatory
                    label: '<b>Section</b>', // You can use HTML/SVG inside labels
                    attributes: { class:'gjs-block-section' },
                    content: `<section>
                      <h1>This is a simple title</h1>
                      <div>This is just a Lorem text: Lorem ipsum dolor sit amet</div>
                    </section>`,
                  }, {
                    id: 'text',
                    label: 'Text',
                    content: '<div data-gjs-type="text">Insert your text here</div>',
                  }, {
                    id: 'image',
                    label: 'Image',
                    // Select the component once it's dropped
                    select: true,
                    // You can pass components as a JSON instead of a simple HTML string,
                    // in this case we also use a defined component type `image`
                    content: { type: 'image' },
                    // This triggers `active` event on dropped components and the `image`
                    // reacts by opening the AssetManager
                    activate: true,
                  }
                ]
              },


            // Avoid any default panel
              panels: { defaults: [] }
        })

        editor.Panels.addPanel({
            id: 'panel__top',
            el: '.panel__top',
        });

        editor.Panels.addPanel({
            id: 'basic-actions',
            el: '.panel__basic-actions',
            buttons: [
                {
                    id: 'visibility',
                    active: true, // active by default
                    className: 'btn-toggle-borders',
                    label: '<u>B</u>',
                    command: 'sw-visibility', // Built-in command
                }, {
                    id: 'export',
                    className: 'btn-open-export',
                    label: 'Exp',
                    command: 'export-template',
                    context: 'export-template', // For grouping context of buttons from the same panel
                }, {
                    id: 'show-json',
                    className: 'btn-show-json',
                    label: 'JSON',
                    context: 'show-json',
                    command(editor) {
                    editor.Modal.setTitle('Components JSON')
                        .setContent(`<textarea style="width:100%; height: 250px;">
                        ${JSON.stringify(editor.getComponents())}
                        </textarea>`)
                        .open();
                    },
                }
            ],
        });


        return () => editor.destroy()
    }, [])

    return (<>
                <div className="panel__top" >
                    <div className="panel__basic-actions" ></div>
                </div>
                <div ref={editorRef}></div>
                <div ref={blockRef}></div>
            </>)
}


export default GrapesEditor
    