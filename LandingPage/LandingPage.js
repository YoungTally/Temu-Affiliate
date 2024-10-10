// Enable draggable elements using interact.js
interact('.draggable').draggable({
    inertia: true,

    modifiers: [
        interact.modifiers.restrictRect({
            restriction: 'parent',
            endOnly: true
        })
    ],

    autoScroll: true,

    listeners: {
        move: dragMoveListener,
    }
});

function dragMoveListener (event) {
    var target = event.target;
    
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}

// Enable dropzone for each product box
interact('.product-box').dropzone({
    accept: '.draggable',

    // When an element is dropped into a product box
    ondrop: function (event) {
        const droppedElement = event.relatedTarget;
        const productBox = event.target;

        // Ensure the dropped element fits within the product box
        droppedElement.style.width = '100%'; // Adjust width to fit the product box
        droppedElement.style.height = 'auto'; // Maintain aspect ratio
        droppedElement.classList.add('dropped-in-box'); // Optional for additional styling

        // Move the dropped element inside the product box
        productBox.appendChild(droppedElement);

        // Reset position to avoid issues with positioning after drop
        droppedElement.style.transform = 'none';
        droppedElement.setAttribute('data-x', 0);
        droppedElement.setAttribute('data-y', 0);
    }
});
