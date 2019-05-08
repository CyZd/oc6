Vue.component('alert-message', {
    props:['option'],
    template: `
        <div class="notification is-primary">
        <strong>Attention</strong>
        Aucun résultat pour <slot></slot>
        </div>
    `
})

