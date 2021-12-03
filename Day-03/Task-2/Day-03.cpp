#include <iostream>
#include <fstream>
#include <string>
#include <list>
#include <cmath>

using namespace std;

int main()
{

	int c = 0;

	string line;
	ifstream file("input.txt");

	list<string> input;

	

	if (file.is_open()) {
		while (getline(file, line)) {
			input.push_back(line);
		}
		file.close();
	}
	else std::cout << "Unable to open file";
	auto pinput = input;
	while (true) {
		int bits = 0;
		if (pinput.size() == 1) { break; }
		string check = *pinput.begin();
		bool same = true;
		for (string i : pinput) {
			if (i != check) { same = false; }
		}
		if (same) { break; }
		for (string i : pinput) {
			string bit = i.substr(c, 1);
			if (bit == "1") {
				bits++;
			}
		}

		int ox = 0;

		int s = pinput.size();
		ox = static_cast<float>(bits) / s >= 0.5;

		int counter = 0;

		list <list<string>::iterator> erase;

		for (string i : pinput) {
			if (i.substr(c, 1) != to_string(ox)) {
				auto front = pinput.begin();
				advance(front, counter);
				erase.push_back(front);
			}
			counter++;
		}
		for (auto e : erase) {
			pinput.erase(e);
		}
		c++;
	}

	long long n = stoll(*pinput.begin());
	
	int dec = 0, i = 0, rem;

	while (n != 0) {
		rem = n % 10;
		n /= 10;
		dec += rem * pow(2, i);
		++i;
	}

	int oxygen = dec;

	c = 0;

	file.open("input.txt");
	line = "";

	if (file.is_open()) {
		while (getline(file, line)) {
			input.push_back(line);
		}
		file.close();
	}
	else std::cout << "Unable to open file";
	pinput = input;
	while (true) {
		int bits = 0;
		if (pinput.size() == 1) { break; }
		string check = *pinput.begin();
		bool same = true;
		for (string i : pinput) {
			if (i != check) { same = false; }
		}
		if (same) { break; }
		for (string i : pinput) {
			string bit = i.substr(c, 1);
			if (bit == "1") {
				bits++;
			}
		}

		int ox = 0;

		int s = pinput.size();
		if (static_cast<float>(bits) / s == 0) {
			ox = 0;
		}
		else if (static_cast<float>(bits) / s < 0.5) {
			ox = 1;
		}


		int counter = 0;

		list <list<string>::iterator> erase;

		for (string i : pinput) {
			if (i.substr(c, 1) != to_string(ox)) {
				auto front = pinput.begin();
				advance(front, counter);
				erase.push_back(front);
			}
			counter++;
		}
		for (auto e : erase) {
			pinput.erase(e);
		}
		c++;
	}

	n = stoll(*pinput.begin());

	dec = 0, i = 0, rem;

	while (n != 0) {
		rem = n % 10;
		n /= 10;
		dec += rem * pow(2, i);
		++i;
	}

	int co2 = dec;

	std::cout << oxygen << ", " << co2 << ", " << oxygen * co2;

	return 0;
}