function Stats({ items }) {
    if (!items.length)
        return <p className="stats">
            <em>
                Start adding some items to your packing
            </em>
        </p>
    const numItems = items.length
    const numPacked = items.filter((item) => item.packed).length
    const parentage = Math.round((numPacked / numItems) * 100)

    return <footer className="stats">
        <em>
            {parentage === 100 ? 'You Got everything! ready to go ' : `You Have ${numItems} item on your list , and you already packed ${numPacked} (${parentage}%)`}
        </em>
    </footer>
}

export default Stats