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
	const tel_RE = /^01[0-9][ \-]?[0-9]{7,9}$/;

	let shoes: Shoe[] = [];

	shoes = addShoe(newShoe(), shoes);

	let name: string = '';
	let phone: string = '';
  let email: string = '';
	let state: string = '';
	let ic_no: string = '';
  let player: boolean;
	let club: string = 'None';
	let street: string = '';
	let postcode: string = '';
	let town: string = '';

	let userValid: boolean;
	let shoesValid: boolean;
	let formValid: boolean;

	$: userValid = userDataValid(name, phone, state);
	$: shoesValid = orderDataValid(shoes);
	$: formValid = userValid && shoesValid;

	function validatePhone(event: Event) {
		const input_elem = event.target as HTMLInputElement;
		const value = input_elem.value;

		if (!tel_RE.test(value)) {
			// if the user input doesn't fit the pattern
			input_elem.setCustomValidity(m.invalid_phone());
		} else {
			// number is fair and valid
			input_elem.setCustomValidity('');
		}

		input_elem.reportValidity();
	}

	async function handleSubmit() {
		if (!formValid) {
			alert('{m.invalid_submit()}');
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
					ic_no,
					phone,
          email,
					club,
					street,
					postcode,
					town,
					state,
					shoes
				})
			});

			const result = await response.json();
			console.log(result);

			if (response.ok) {
				alert(m.order_submit());
			} else {
				alert(`Error: $(result.error)`);
			}
		} catch (err) {
			alert('Network or server error prevented form submission');
			console.log(err);
		}
	}

</script>

<header></header>

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
				<td><label for="ic" required>{m.ic_no()}: </label></td>
				<td>
          <input
						type="text"
						name="ic_no"
						bind:value={ic_no}
						placeholder="630916-10-1234"
            pattern="\d{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[ |\-]?(0[1-9]|1[0-6]|2[1-9]|[3-5][0-9]|6[0-8]|7[1-2]|7[4-9]|8[2-9]|9[0-3]|9[89])[ |\-]?\d{4}$"
						required
					/>
				</td>
			</tr>

			<tr>
				<td><label for="phone">{m.phone()}: </label></td>
				<td>
          <input
						type="text"
						name="phone"
						bind:value={phone}
						on:input={validatePhone}
						placeholder="0123456789"
						required
					/>
        </td>
			</tr>

      <tr>
        <td><label for='email'>{m.email()}: </label></td>
        <td><input type='email' name='email' bind:value={email} required></td>
      </tr>

      <tr>
        <td><label for="player">{m.player()}</label></td>
        <td><input type='checkbox' name='player' bind:checked={player} /> </td>
      </tr>
      
      {#if player == true}
        <tr>
          <td><label for="club">{m.club()}: </label></td>
          <td><input type="text" name="club" bind:value={club} required /> </td>
        </tr>
      {/if}      

			<tr>
				<td><label for="street" required>{m.street()}: </label></td>
				<td><input type="text" name="street" bind:value={street} required /> </td>
			</tr>

			<!--> TODO: Postcode to state conversion <-->
			<tr>
				<td><label for="postcode" required>{m.postcode()}: </label></td>
				<td><input type="number" name="postcode" bind:value={postcode} required /> </td>
			</tr>

			<tr>
				<td><label for="city" required>{m.postTown()}: </label></td>
				<td><input type="text" name="city" bind:value={town} required /> </td>
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
            <option value="Foreign">{m.foreign()}</option>
					</select>
				</td>
			</tr>
		</tbody>
	</table>

	<h4>{m.orders()}</h4>

	<!--> This part needs to be dynamically generated and named/ID-ed for submission <-->
	<table id='shoe-table'>
		<tbody>
			{#each shoes as shoe, i (i)}
				<tr>
					<td>
						<input type="hidden" name="index{i}" value={shoe.number} />
						<label class="shoeLabel" for="id{i}">{m.prod_id()}</label>
						<input type="text" name="id{i}" bind:value={shoe.id} required />
					</td>

					<td>
						<label class="shoeLabel" for="colour{i}">{m.colour()}</label>
						<select bind:value={shoe.colour} name="colour{i}" required>
							<option value="" disabled selected>{m.select()}</option>
							{#each colours as col}
								<option value={col}>{m[`colour_${col}`]()}</option>
							{/each}
						</select>
					</td>

					<td>
						<label class="shoeLabel" for="size{i}">{m.size()}</label>
						<input type="number" name="size{i}" bind:value={shoe.size} min="4" step='0.5' required />
					</td>

					<td>
						<label class="shoeLabel" for="quantity{i}">{m.quantity()}</label>
						<input type="number" name="quantity{i}" bind:value={shoe.quantity} required />
					</td>

					  <td>
					{#if shoes.length > 1}
							<button type="button" class='delete' on:click={() => (shoes = removeShoe(shoe.number, shoes))}>
                <span class='material-icons'>delete</span>
              </button>
					{/if}
					  </td>
				</tr>
			{/each}
		</tbody>
	</table>

	<div class="spanPageWidth">
		<button type="button" id="add" on:click={() => (shoes = addShoe(newShoe(), shoes))}
			>{m.add_item()}</button
		>
	</div>

	<div class="spanPageWidth">
		<button type="submit" id="submit" disabled={!formValid}>{m.submit()}</button>
	</div>
</form>
