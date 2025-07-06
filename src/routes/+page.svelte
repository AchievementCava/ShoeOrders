<script lang="ts">
	import { setLocale } from '$lib/paraglide/runtime';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { m } from '$lib/paraglide/messages.js';
  import { Colour, Shoe } from '$lib/types/Shoe';
  import { 
    userDataValid, 
    orderDataValid,
    addShoe,
    removeShoe,
    newShoe
  } from '$lib/validation/orderForm';

  const colours = Object.values(Colour);

  let shoes: Shoe[] = [];

  shoes = addShoe(newShoe(), shoes);

  let name: string = "";
  let phone: string = "";
  let state: string = "";

  let userValid: boolean;
  let shoesValid: boolean;
  let formValid: boolean;

  $: userValid = userDataValid(name, phone, state);
  $: shoesValid = orderDataValid(shoes);
  $: formValid = userValid && shoesValid;

  async function handleSubmit() {
    if (!formValid) {
      alert("{m.invalid_submit()}");
      return;
    }

    //logic here
    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        handlers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          phone,
          state,
          shoes
        })
      });

      const result = await response.json();

      if (response.ok){
        alert(m.order_submit());
      } else {
        alert(`Error: $(result.error)`);
      }
    } catch (err) {
      alert("Network or server error prevented form submission");
    }
  }
</script>

<header>

</header>

<h1>{m.order_form()}</h1>

<form on:submit|preventDefault={handleSubmit}>
<table>
	<thead></thead>

	<tbody>
		<tr>
			<td><label for="name" required>{m.name()}: </label></td>
			<td><input type="text" name="name" bind:value={name} required /></td>
		</tr>

		<tr>
			<td><label for="phone">{m.phone()}: </label></td>
			<td><input type="text" name="phone" bind:value={phone} pattern="^01[0-9][ \-]?[0-9]{7,8}$" placeholder="0123456789" required /></td>
		</tr>

		<tr>
			<td><label for="state">{m.state()}: </label></td>
			<td>
				<select name="state" bind:value={state} required>
					<option value="">{m.select()}</option>
					<option value="Johor">Johor</option>
					<option value="Kedah">Kedah</option>
					<option value="Kelantan">Kelantan</option>
					<option value="Melaka">Melaka</option>
					<option value="N9">Negeri Sembilan</option>
					<option value="Pahang">Pahang</option>
					<option value="Penang">Penang</option>
					<option value="Perak">Perak</option>
					<option value="Perlis">Perlis</option>
					<option value="Sabah">Sabah</option>
					<option value="Sarawak">Sarawak</option>
					<option value="Selangor">Selangor</option>
					<option value="Terengganu">Terengganu</option>
					<option value="KL">WP Kuala Lumpur</option>
					<option value="Labuan">WP Labuan</option>
					<option value="Putrajaya">WP Putrajaya</option>
				</select>
      </td>
		</tr>
  </tbody>

</table>

<h4>{m.orders()}</h4>

<!--> This part needs to be dynamically generated and named/ID-ed for submission <-->
<table>
  <tbody>
    {#each shoes as shoe, i (i)}
    <tr>
      
      <td>
        <input  type='hidden' name="index{i}" value={shoe.number}>
        <label class='shoeLabel' for="id{i}">{m.prod_id()}</label>
        <input type='text' name='id{i}' bind:value="{shoe.id}"required />
      </td>
  
      <td>
        <label class='shoeLabel' for="colour{i}">{m.colour()}</label>
        <select bind:value={shoe.colour} name="colour{i}" required>
        <option value="" disabled selected>{m.select()}</option>
          {#each colours as col}
            <option value={col}>{m[`colour_${col}`]()}</option>
          {/each}
        </select>
      </td>

      <td>
        <label class='shoeLabel' for="size{i}">{m.size()}</label>
        <input type='number' name="size{i}" bind:value="{shoe.size}" min='4' required />
      </td>

      <td>
        <label class='shoeLabel' for="quantity{i}">{m.quantity()}</label>
        <input type='number' name="quantity{i}" bind:value="{shoe.quantity}" required />
      </td>

      <td>
      {#if shoes.length > 1} 
        <button type='button' on:click={() => (shoes = removeShoe(shoe.number, shoes))}>del</button>
      {/if}
      </td>

    </tr>
    {/each}
  </tbody>
</table>

<div class='spanPageWidth'>
  <button type='button' id='add' on:click={() => (shoes = addShoe(newShoe(), shoes))}>{m.add_item()}</button>
</div>

<div class='spanPageWidth'>
  <button type='submit' id='submit' disabled={!formValid}>{m.submit()}</button>
</div>
</form>
